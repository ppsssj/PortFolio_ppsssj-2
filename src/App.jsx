import { useEffect, useRef, useState } from "react";

const SOURCE_PATH = "/mersi-source.html";

function cloneScript(sourceScript) {
  const script = document.createElement("script");

  for (const { name, value } of Array.from(sourceScript.attributes)) {
    script.setAttribute(name, value);
  }

  if (sourceScript.src) {
    script.src = sourceScript.src;
    script.async = sourceScript.async;
    script.defer = sourceScript.defer;
  } else {
    script.textContent = sourceScript.textContent;
  }

  script.dataset.mersiReactScript = "true";
  return script;
}

function shouldSkipScript(sourceScript) {
  const src = sourceScript.getAttribute("src") || "";
  const content = sourceScript.textContent || "";
  const value = `${src}\n${content}`;

  return /googletagmanager|google-analytics|recaptcha|grecaptcha|gtag|dataLayer/i.test(value);
}

function shouldSkipHeadNode(node) {
  const tagName = node.tagName.toLowerCase();

  if (tagName === "title") {
    return true;
  }

  if (tagName === "meta") {
    if (node.hasAttribute("charset")) {
      return true;
    }

    if (node.getAttribute("name") === "viewport") {
      return true;
    }
  }

  return false;
}

function syncBodyAttributes(sourceBody) {
  const originalAttributes = Array.from(document.body.attributes).map(({ name, value }) => ({
    name,
    value,
  }));

  for (const { name } of Array.from(document.body.attributes)) {
    document.body.removeAttribute(name);
  }

  for (const { name, value } of Array.from(sourceBody.attributes)) {
    document.body.setAttribute(name, value);
  }

  return () => {
    for (const { name } of Array.from(document.body.attributes)) {
      document.body.removeAttribute(name);
    }

    for (const { name, value } of originalAttributes) {
      document.body.setAttribute(name, value);
    }
  };
}

function App() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    const cleanupTasks = [];
    const previousTitle = document.title;

    async function loadMersiPage() {
      try {
        const response = await fetch(SOURCE_PATH, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Failed to load ${SOURCE_PATH} (${response.status})`);
        }

        const html = await response.text();

        if (cancelled) {
          return;
        }

        const parser = new DOMParser();
        const documentNode = parser.parseFromString(html, "text/html");

        document.title = documentNode.title || previousTitle;
        cleanupTasks.push(() => {
          document.title = previousTitle;
        });

        cleanupTasks.push(syncBodyAttributes(documentNode.body));

        const headNodes = [];

        for (const node of Array.from(documentNode.head.children)) {
          if (node.tagName.toLowerCase() === "script" || shouldSkipHeadNode(node)) {
            continue;
          }

          const clone = node.cloneNode(true);
          clone.dataset.mersiReactHead = "true";
          document.head.appendChild(clone);
          headNodes.push(clone);
        }

        cleanupTasks.push(() => {
          headNodes.forEach((node) => node.remove());
        });

        const container = containerRef.current;

        if (!container) {
          return;
        }

        container.innerHTML = "";

        for (const node of Array.from(documentNode.body.childNodes)) {
          if (node.nodeName.toLowerCase() === "script") {
            continue;
          }

          container.appendChild(node.cloneNode(true));
        }

        const runtimeScripts = [];
        const allScripts = [
          ...Array.from(documentNode.head.querySelectorAll("script")),
          ...Array.from(documentNode.body.querySelectorAll("script")),
        ].filter((script) => !shouldSkipScript(script));

        for (const sourceScript of allScripts) {
          const clonedScript = cloneScript(sourceScript);
          const parent = sourceScript.closest("head") ? document.head : container;
          parent.appendChild(clonedScript);
          runtimeScripts.push(clonedScript);
        }

        cleanupTasks.push(() => {
          runtimeScripts.forEach((script) => script.remove());
        });

        setStatus("ready");
      } catch (error) {
        if (cancelled) {
          return;
        }

        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      }
    }

    loadMersiPage();

    return () => {
      cancelled = true;
      cleanupTasks.reverse().forEach((task) => task());

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="app-shell">
      {status === "loading" ? (
        <div className="status-screen">
          <span className="status-screen__eyebrow">React Runtime</span>
          <h1>MERSI HTML을 React에서 불러오는 중입니다.</h1>
          <p>원본 마크업, 스타일, 외부 스크립트를 순서대로 적용하고 있습니다.</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="status-screen status-screen--error">
          <span className="status-screen__eyebrow">Load Error</span>
          <h1>MERSI 페이지를 로드하지 못했습니다.</h1>
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={status === "ready" ? "mersi-runtime is-ready" : "mersi-runtime"}
        aria-busy={status === "loading"}
      />
    </div>
  );
}

export default App;

