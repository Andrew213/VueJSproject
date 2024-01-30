import { DirectiveBinding } from "vue";

export default {
  name: "intersection",
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          binding.value();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1,
      }
    );

    observer.observe(el);
  },
};
