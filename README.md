clumpy
======

clumpy is my javascript library that has the bits I often miss in the general javascript implementation. It was born out of practical need.

I am developing other libraries / helpers that live with clumpy, they all require clumpy but not necessarily anything else. A notable exception is where something is built to take advantage of JQuery, like zjax.


zjax
====

zjax is a play on ajax, where ajax is the beginning zjax is the end. zjax was created to alleviate speghetti code syndrome. Too often ajax calls litter javascript, with no rhyme or reason. zjax improves code flow; in brief, you now define your ajax calls, each with an id and description. You then fire off or repeat these ajax calls, and you can request a report of all the calls that have been added.

The effect is that similar operations are grouped together instead of littered around the page. Calls are added in the beginning. Success / fail / always are handled in the same place, switching on id.

zjax uses a very similar interface to JQuery .ajax, in fact as similar as possible so it can be as near to a drop-in replacement as possible. Please see the proofs included here for examples of how zjax works.

