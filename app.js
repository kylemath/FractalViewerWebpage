const views = {
    mandelbrot: {
        id: "mandelbrot",
        title: "Mandelbrot Set",
        src: "fractal.html",
        blurb: "2D escape-time fractal",
        hint: "Drag to pan · scroll to zoom"
    },
    mandelbulb: {
        id: "mandelbulb",
        title: "Mandelbulb",
        src: "mandelbulb.html",
        blurb: "3D extension of the Mandelbrot set",
        hint: "Drag to rotate · scroll to zoom"
    }
};

const viewport = document.getElementById("viewport");
const viewTitle = document.getElementById("view-title");
const viewBlurb = document.getElementById("view-blurb");
const viewHint = document.getElementById("view-hint");
const choices = document.querySelectorAll(".choice");

function viewFromHash() {
    const id = location.hash.replace("#", "");
    return views[id] ? id : "mandelbrot";
}

function showView(id, updateHash) {
    const view = views[id] || views.mandelbrot;
    if (viewport.getAttribute("src") !== view.src) {
        viewport.src = view.src;
    }
    viewport.title = view.title;
    viewTitle.textContent = view.title;
    viewBlurb.textContent = view.blurb;
    viewHint.textContent = view.hint;
    document.title = "Fractal Viewer — " + view.title;

    choices.forEach((button) => {
        const selected = button.dataset.view === view.id;
        button.setAttribute("aria-checked", selected ? "true" : "false");
    });

    if (updateHash && location.hash !== "#" + view.id) {
        history.replaceState(null, "", "#" + view.id);
    }
}

choices.forEach((button) => {
    button.addEventListener("click", () => {
        showView(button.dataset.view, true);
    });
});

window.addEventListener("hashchange", () => {
    showView(viewFromHash(), false);
});

showView(viewFromHash(), true);
