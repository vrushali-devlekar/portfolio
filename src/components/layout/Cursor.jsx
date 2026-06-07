import { useEffect } from "react";

function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const hoverables = document.querySelectorAll("a,button,.show-card");

    hoverables.forEach((item) => {
      item.addEventListener("mouseenter", () => cursor.classList.add("grow"));
      item.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
    });

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor"></div>;
}

export default Cursor;
