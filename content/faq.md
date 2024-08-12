---
title: "Frequently Asked Questions"
date: "2021-02-07"
---

## Can I place an order by phone or mail?

Sorry but no. SignalStuff is primarily run by a single person -- Richard Bateman, KD7BBC. Other help is mostly provided by volunteers. In cases where email is not sufficient we will sometimes make a phone call, but that's not the normal situation. You can contact us with questions at [orders@signalstuff.com](mailto:orders@signalstuff.com).

## I placed an order and it's running late! What do I do?

If you email us at [orders@signalstuff.com](mailto:orders@signalstuff.com) we'll look into it -- sometimes things come up, and we are a small shop and make mistakes sometimes. That said, often the issue is with the shipping carrier; USPS has been particularly prone to misplacing orders and sometimes not scanning them at all. This is our policy for any shipments which are running late:

- Domestic: For shipments to persons in the United States of America we will not take action until the shipment has gone two weeks (14 calendar days) without any updates. At that time we will send an additional shipment; if the original shipment arrives after that then we will provide instructions on how to send it back.

- International: For shipments to persons outside of the United States of America we are happy to assist with contacting the carrier for more information after 14 calendar days, but we will not send a replacement unless it has gone for a full month without any tracking updates

We really apologize for the need for these policies as we understand that it is not ideal; experience shows that taking action before those times will almost always result in duplicate shipments arriving, often at the same time.

## I put my Signal Stick antenna on an SWR meter / antenna analyzer and the SWR is awful!

**_TL/DR:_** Before you panic over this please test it in a real-world situation -- the SWR you're reading is not the SWR you're getting when using it normally.

The Super-Elastic Signal Stick is a classic 1/4 wave 2 meter design which by a happy coincidence is also a 3/4 wavelength on 70cm. Technically, for this antenna to work it also needs a 1/4 wave \*counterpoise\* to go with it; you may notice that there isn't one =\] Because of that the other half of the antenna is provided by the chassis of the radio, which means that actual SWR is going to vary a bit \*constantly\*. While in theory that seems like it would be a problem, in practice it's the case with nearly all HT antennas.

In short, every SWR meter you connect will give you a slightly different reading. Change the coax? Different reading. Different antenna analyzer? Different reading. It's easy to get caught up in the theory and say "oh, that means they are awful!" Before you do that, please actually try them =\]

The Signal Stick has been testing over many years in many different configurations and we have sized it in the way that seems to most consistently work **_in real-world situations._** This is one of those cases where theory and practice diverge a bit :-/

You can get a more consistent reading if you isolate the feedline and meter from the antenna using an RF choke, such as a large ferrite just below the antenna connector -- you'd then need to add a counterpoise to the shield, and then you can get a consistent reading. Of course, unless you're operating that way it's arguably not realistic, but it's consistent and shows that the antenna can have very good SWR =\] Another thing that works similarly is to provide a good solid ground on the shield and that will often improve things significantly.

## I put my Signal Stick antenna on an SWR meter / antenna analyzer and the SWR is fantastic!

We're very happy for you and wish that it was a reliable reading ;-) Please see the answer to the previous section to understand why it's probably not accurate. In particular, read the TL,DR section.

## What is covered by the lifetime warranty?

Any damage which is not intentional. If you cut your antenna shorter because you think it will improve the SWR (see above questions) and it makes things worse, please don't ask us to replace it free of charge =\]

## What is the difference between the different colors of antennas?

The various colors are specially formulated to enable them to be easily distinguished on the visible light spectrum -- for example, the "yellow" signal stick will appear to be the color Yellow. The "Glow in the Dark" signal stick will actually absorb energy from ambient light (particularly ultra-violet light) and then emit that when in low light conditions using special wavelengths which will appear to have a greenish tint using an effect called [phosphorescence](https://en.wikipedia.org/wiki/Phosphorescence).

There is no impact on the actual performance as an antenna.

## Do you sell any tri-band antennas?

Sadly, no. We hope to some day, but we need some help from an antenna engineer with more skill than we have. Perhaps some day. If you have a design you want to share to make one of our current antennas tri-band please let us know =\]

## Can I get a custom antenna for \_\_\_\_\_\_\_\_\_\_\_\_?

No. Sorry, but SignalStuff exists to provide funding for HamStudy and ExamTools -- and if we spend all our time making custom antennas then none of that time is spent actually writing the software, which tends to be a bit self-defeating. Sure, we might make more money, but at the expense of doing what we actually want to do and reaching our main goal. That said:

**Airband:** An airband antenna (~121MHz) would be about 3 inches longer -- the dual band signal stick is close enough that while the SWR won't be amazing, it may still work better than your rubber duck. We're not sure, you'd have to try it, but you are welcome to try it if you want. We don't have a way to make them though because we get everything pre-cut to save time. Maybe some day =\]

**GMRS:** The typical Signal Stick will probably work fine on GMRS -- many people use it already and report good results. That said, if you want to be "mathematically correct" you could in theory make the antenna about 1.1 inches shorter to make the dual band (19") signal stick match GMRS better (and also MURS).

The 440 antenna should work fine as-is, but in theory about a quarter (1/4) inch could be cut off to make it match better in theory. In practice it's likely that you'd add more variance by moving your arm across your body, so it seems silly to us, but that's what the math says.

**_Note that we will not do a warranty replacement on an antenna just because you cut it and it didn't work as well as you hoped. Once you cut it, the only way you get a warranty replacement is if something unrelated to that cut breaks, so that's at your own risk!_**

**MURS:** The typical Signal Stick will probably work fine on MURS -- many people use it already and report good results. That said, if you want to be "mathematically correct" you could in theory make the antenna about 1.1 inches shorter to make the dual band (19") signal stick match MURS better (and also GMRS).

## Are you going to make a Super-Elastic Yagi?

While we're not fundamentally opposed to the idea, we also can't think of a way that this could actually work. The spacing on a yagi needs to be pretty consistent, and anyone who has held a signal stick sideways can tell you that it droops -- and as you move around it bobs forward and backward. A yagi would need some way to keep the spacing consistent regardless of any movement and that just seems unrealistic. We get asked about this surprisingly often, but just can't see any way it could be make practical.

## Are you going to make a 6 meter Signal Stick?

Signal Sticks are 1/4 wavelength on the primary frequency (2 meters); they handle 70cm by a convenience of math that says that a 1/4 wavelength on 146MHz is also a 3/4 wavelength on 440MHz.

In order to work on 6 meters it would need to be a 1/4 wavelength on 6 meters. A 6 meter signal stick would be about 51 inches long; we've been experimenting with making longer [Signal Stalks](https://signalstuff.com/product/super-elastic-signal-stalk/) (vehicle mount) and a 40" long Signal Stalk is only barely usable -- and only because we use 3mm diameter wire for it. Signal Sticks are made with 1.5mm diameter wire. In short, **_a 6m signal stick would be too long to even stand up on its own_**.

## Are you going to make a half-wave Signal Stick?

We are not; for multiple reasons, but most particularly:

- A 40" long signal stick would not be able to hold itself erect even when stationary -- much less if you moved around with it.

- We don't currently have a good way to make the matching section at the base (or middle) which would be needed to make a 1/2 wave antenna viable.

## I have a question not answered here! How can I ask it?

The easiest way is to email [orders@signalstuff.com](mailto:orders@signalstuff.com) and we'll answer as soon as we can.
