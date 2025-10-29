import type { Directive, DirectiveBinding, VNode } from 'vue';

export type IntersectionCallback = (entry: IntersectionObserverEntry, element: HTMLElement) => void | null;

export interface IIntersectionObserverBinding {
  callback?: IntersectionCallback;
  options?: IntersectionObserverInit;
}

type ObservedElement = HTMLElement & {
  __intersectionObserverCallback?: IntersectionCallback | null;
  __intersectionObserver?: IntersectionObserver | null;
}

export const vIntersectionObserver = {
  mounted(el: ObservedElement, binding: DirectiveBinding<IIntersectionObserverBinding>, vnode: VNode) {
    el.__intersectionObserverCallback = binding.value.callback;
    el.__intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (el.__intersectionObserverCallback) {
            el.__intersectionObserverCallback(entry, el);
          }
        });
      },
      binding.value.options,
    );

    el.__intersectionObserver.observe(el);
  },
  updated(el: ObservedElement, binding) {
    el.__intersectionObserverCallback = binding.value.callback;
  },
  unmounted(el: ObservedElement) {
    delete el.__intersectionObserverCallback;

    if (el.__intersectionObserver) {
      el.__intersectionObserver.disconnect();
    }
  },
} as Directive<HTMLElement, IIntersectionObserverBinding>;
