clumpy
======

[This is so old now, only really useful for the 3d stuff. Standard libraries have caught up :)]

clumpy is my javascript library that has the bits I often miss in the general javascript implementation. It was born from need.


zjax
====

zjax was created to alleviate speghetti code syndrome.Define ajax calls, each with an id and description, then fire off or repeat these ajax calls. You can request a report of all the calls that have been added.

The effect is that similar operations are grouped together instead of littered around the page. Calls are added in the beginning. Success / fail / always are now typically handled in the same place, switching on id.

zjax's interface is cloned from JQuery .ajax at the time of writing.

