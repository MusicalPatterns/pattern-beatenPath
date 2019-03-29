# Beaten Path

repeated metric modulation of polyrhythms by neighboring superparticulars, 
never deviating any further from original duration than necessary

### core cycles

The first major step in materializing a Beaten Path is computing the `core` cycles. 
They take the `core`, a Beaten-Path-specific nominal integer type, as their only parameter.
The cycle is a series of values, starting with `1` and ending by wrapping back around to that same `1` (hence "cycle").

Each next value in the cycle is found by multiplying the previous value by one of two important fractions 
which each `core` is associated with: a superparticular fraction, and a subparticular fraction.

The superparticular is the fraction `core / (core - 1)`.
The subparticular is the fraction `core / (core + 1)`.

The cycle ends when you have arrived at a value that is extremely close to `1` again.

### commas

You can never **exactly** reach `1` again, for a simple reason:
Because each new factor in the numerator is always the `core`, and each new factor in the denominator is never the `core`,
you can never cancel anything out, so the factorization grows increasingly complex forever.
In spite of this bottomless pit of complexity, though, moments of near-convergence exist.
For example, if `core` is `4`, you will be repeatedly multiplying either `4/3` or `4/5`.
The first several values are:
```
1 / 1
4 / 5
16 / 15
64 / 75
256 / 225
```
If you keep going, eventually we find a value very close to `1 / 1`: `4294967296 / 4271484375`.
In decimal expansion that's `~1.0054976019899406`.
And in terms of its factorization, that requires sixteen steps to complete, because it has thirty-two `2`'s in the numerator (two for each `4`, the core)
and it has seven `3`'s and nine `5`'s in the denominator.

Since that value is so close to `1`, we don't actually include it in the cycle.
Instead, we just connect our cycle's end back up to it's beginning at this point.
No one should notice that we moved to `1` instead of to `4294967296 / 4271484375`.

Such tiny ratios are known in the biz as "commas". The comma for core 4 is known as the "escapade comma".
There are simpler commas which use only `4`'s on one side and only `3`'s and `5`'s on the other.
For example, the "misty comma" has thirteen `2`'s in the numerator, and twelve `3`'s and three `5`'s in the denominator.
At `67108864 / 66430125 ≈ 1.01021733739` it's not quite as close to 1, but there's a more important reason it is not the comma for core 4:
You could not arrive at by following the Beaten Path process.
The fact that there are thirteen `4`'s in the numerator suggests that the cycle completes in thirteen steps.
However, that means there must be a total of thirteen `3`'s and `5`'s on the other side, one for each fraction we multiplied with a `4` in the numerator.
As we can see, though, there are twelve plus three equals fifteen factors in the denominator.

In other words, Beaten Path is less about the commas it happens to arrive at, and more about the path through them.

### absolute ratio

But how do we pick which of the two - super- or sub-particular - we move by each step? 
Good question. Really, kind of "the" question of Beaten Path.
The defining constraint of the Beaten Path process is that each next fraction is the one which, when you multiply it with the current value,
gets you the closest to 1.

We decide this by comparing the "absolute ratios" of the two possibilities.
If an absolute value is for ensuring all values are on the same side of the additive identity, 0,
then an absolute ratio is for ensuring all values are on the same side of the multiplicative identity, 1.
In other words, if your value is greater than 1, take its reciprocal.
That way we can compare the two possibilities, even if one is above `1` and one is below.

For example, consider this step from `core` of `3`, ten steps in, where our value is `59049 / 65536`.
As usual, we have the choice of moving by either `3 / 4` or `3 / 2`.
If we moved by `3 / 4` we would get `177147 / 262144`.
If we moved by `3 / 2` we would get `177147 / 131072`.
So which is closer to `1`, then: `177147 / 262144`, or `177147 / 131072`?

Allow me to interrupt myself by first illustrating an important approach **not** to take (based on experience).
Consider the two values' decimal expansions, `0.67576217651` and `1.35152435303`, respectively.
We may be tempted to say that the former of the two is closer to `1`;
the traditional absolute value of the difference between `1` and `0.67576217651` is only `0.32423782349` 
while the traditional absolute value of the difference between `1` and `1.35152435303` is a bit bigger at `0.35152435303`.
However, comparing these two values arithmetically is unfair to the greater of the two. 
The lesser will only ever shrink in a range from 1 to approaching 0, while the greater can grow ad infinitum.
We need an operation that equalizes the scale of both sides of the multiplicative identity.
Enter absolute ratio.

If we take the reciprocal of `177147 / 131072` so that it is also less than `1`, then we can compare it with `177147 / 262144`.
So, finally, which is closer to `1`: `177147 / 262144`, or `131072 / 177147`?
`131072 / 177147 ≈ 0.7399052764`. Recall that `177147 / 262144` was `0.67576217651`. 
So the answer which is closest to 1, as it turns out, is `131072 / 177147`! 
Perhaps surprisingly, the value with the greater absolute value difference is actually the value which is closer to `1` in the multiplicative sense.

### features

All this still is not enough information to create music.
Well, it's easy enough to express this process musically.
Assign note durations to the values of the core cycle. 
That way, as the piece moves from value to value, metric modulation occurs repeatedly, until finally upon wrapping around,
we return to a beat value able to be conflated with the initial.

Finally, to bring the music to life, assign the pitch as the reciprocal of the duration. 
As the duration goes down, the frequency goes up proportionally. In other words, every note will have the same number of vibrations.

### entities

Beaten Path may be articulated by a single entity. In this case the entity simply sounds each value of the cycle, and repeats.

However, things get a bit more interesting when you start adding more entities.

The rule here is that at no point is any entity playing the same note as any other entity.
However, they are all playing sequential notes from the core cycle. 
With two entities, they'd begin the piece with one playing the first first value, the other playing the second.
With three entities, they'd begin the piece by playing values 1, 2, and 3, respectively.

Each note has a different pitch, so they form a chord together.
But the fact that they each have a different duration poses a problem: how to keep the entities together?
Assuming we want to keep them together, somewhat like typical music with chord progressions and a chord per measure and such.
Well, the answer to this is: take the lowest common multiple of all of the entities' values, and use that as your bar length.
Each entity repeats its note however many times it takes to fill that duration, but when that duration comes and every entity
is in sync, that's our opportunity to make a change as we go to a new bar.

Only one entity changes at a time. The entities leapfrog through the values of the core cycle. 
That is, when it is an entity's turn to advance through the core cycle, it jumps to the first value which is not currently reached
by any other entity yet.
In this way, the chord that the entities make together changes only one of its pitches each new bar.
And each entity stays on each note it plays a number of bars equal to the entity count before changing to the next note.

### loop

When the count of entities does not divide evenly into the core cycle length, we find ourselves in a situation where 
we have completed a core cycle (what we call a "loop"), but the entities won't line up with each other. 
In other words, the entity whose turn it is to jump will not be wanting to jump to the note it played in the first bar.
Instead it will be wanting to jump to the first note some other entity played. 

No problem though. It just means that the pattern in its entirety will be extended long enough that it fits the lowest common multiple
of the entity count and the core cycle length. It'll keep repeating the core cycle, each time the entities trading places, 
until finally the entities have traded all the way back to their original positions.

## development

In terms of the code, we represent the core cycle in two different ways: the `coreDurations` and the `coreIntervals`.
The `durations` are simple numerical representations of the values arrived at along the way.
The `intervals` are tuples of numerators and denominators. Each `interval` is either the superparticular or the subparticular.
and it tells you which of those two fractions gets you from the analogous `duration` to the next.

1) The first major step in materializing a Beaten Path is computing the `core` cycles. 
2) Then we need to find the duration indices (for each segment, which entity is on which core cycle value - mapping the leapfrogging.)
3) Then we calculate the different note counts each entity needs in that segment to them to together form a polyrhythm within the bar.
4) Based on the style and repetitions etc., we create a bar for each segment.
5) We divvy those out the right entities based on the loop stuff. We may also do a tiny post-processing on the total bar duration
in order to prevent the performer service from computing the total duration of the pattern to be literally eons because
one voice will be off by a microscopic amount causing the LCM to skyrocket. 
