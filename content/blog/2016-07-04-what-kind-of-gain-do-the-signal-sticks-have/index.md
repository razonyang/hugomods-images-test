---
title: "What kind of gain do the Signal Sticks have?"
date: "2016-07-04"
type: post
---

## Questions about antenna gain

Probably the question I get asked most is "what kind of gain do the signal sticks have", and "why don't you list gain on the site?"  I have answered many people individually, but it comes up often enough that I figured I should probably write up an explanation.

First and foremost, the reason I don't list the gain of the antenna is that I don't like to lie to people. I consider it dishonest to give a number which can't be proven in actual use. Here is the problem with "gain": gain is a relative term. Literally.  Gain is defined as "increase the amount or rate of (something, typically weight or speed)" -- in this case, it would be an increase in output, signal strength, etc.  Here is the issue, though: it has to be relative to something.

When you transmit, you put out a certain amount of power -- if it's a handheld, that might be 5 watts.  If you have an "ideal antenna" then those 5 watts will go out from the radio and nothing will be reflected back to the radio (in a simplified way, this is what SWR is: how much power was radiated vs reflected). However, if you had a theoretically ideal antenna you could have another theoretically ideal antenna which outperformed it in certain cases.  This is because there are actually two things to worry about: 1) the power of the radiated signal, and 2) the _direction_ of the radiated signal.

Some antennas will tell you that they are 3dB gain -- this means they will have twice the signal strength of some other antenna. If you see 3dB then you should find out what that is in relationship to.  I can confidently tell you that you should get _at least_ 15dB gain using my antennas.... compared to using a dummy load.

Finally, a "rubber duck" antenna is able to be short because it makes up for it's short length by adding a "load" to the antenna -- typically a coil at the base which loses some energy to heat in exchange for making the rest of the antenna resonant at the frequency you need.  It also changes the radiation pattern, though; in general, only a very very poorly designed "whip" antenna would fail to outperform the rubber duck, but remember that radiation pattern!  In some odd cases I've seen it happen, and in a car when the "whip" might have to be bent over the duck will likely work better.

## So stop yakking and answer the question already!

Anyway, the long and the short of it is that it's impossible to tell for sure what the "gain" of an antenna is without doing a lot of careful measurement under different circumstances with very expensive equipment -- equipment that I don't have.  I can't calculate the "gain" relative to your stock "rubber duck" antenna because I don't know the exact characteristics of that antenna.  Added to this is the fact that a typical handheld antenna is actually just half of a dipole, and it doesn't tend to hold still or remain constant relative to things near by that might affect the performance of the antenna -- things like cars, houses, trees, fences, other people, _your arm_, etc.

The dirty truth is that even SWR readings on a handheld antenna may vary as much as _1:1-5:1_ depending on what is near, where the handheld sits, how the antenna is mounted, and any number of other factors.  (Yes, I've measured that). When companies say that their handheld antenna gets 1.5:1 VSWR they are telling you that they managed to find some setup where they could measure that, not that you should actually expect that performance.  In my experience, most handheld antennas are actually operating at more like 3:1.

Our antennas work very well -- they should work _a lot_ better than the stock antenna on your handheld.  If we trust gain figures from [other](https://a.co/d/gESW7gt) [similar](https://a.co/d/aMgkgsB) [commercial](https://a.co/d/2rloNpK) antennas we might guess that these are approximately 2dB on 2m, probably 2dB to 3dB compared to an isotropic antenna on 70cm.  We could further deduce that these should be about +6dB compared to "typical stock HT antennas"... and just think, with that and $5 you can get a drink at the gas station!

The one thing to note is that some other antennas have a matching section in the base that turns the 70cm function of the antenna into a 5/8 wave. Signal Sticks are 3/4 wave on 70cm, which will tend to only be a little better than a really well made rubber duck.

 

I hope that answers some questions!
