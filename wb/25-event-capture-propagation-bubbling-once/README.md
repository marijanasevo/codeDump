# Event Capture, Propagation, Bubbling and Once

## Bubbling and capturing

- When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors is called ___bubbling___, but this is the third phase of event propagation.
- The first phase is called ___capturing___, and does the opposite - the event goes down to the element. In fact, the capturing phase is usually invisible for us because by default `addEventListener` will catch events in bubbling phase if we don't specify otherwise `capture: true`.  
`el.addEventListener('click', handler(), {capture: true})`
- This can be checked with `event.eventPhase` property. But it’s rarely used, because we usually know it in the handler.

![Capturing and Bubbling](https://javascript.info/article/bubbling-and-capturing/eventflow.svg)

- `event.target` – the deepest element that originated the event.
- `event.currentTarget` (=`this`) – the current element that handles the event (the one that has the handler on it)

Bubbling and capturing lay the foundation for _“event delegation”_ – an extremely powerful event handling pattern.

## Stop Propagation

Any event handler can stop the event by calling `event.stopPropagation()`, but that’s not recommended, because we can’t really be sure we won’t need it above, maybe for completely different things, like tracking users behaviour (clicks etc)?

## Once

`once`: if `true`, then the listener is automatically removed after it triggers. Same as `el.removeEventListener(...)`.