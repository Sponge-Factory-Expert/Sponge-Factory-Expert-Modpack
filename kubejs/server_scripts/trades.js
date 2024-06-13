MoreJSEvents.villagerTrades((event) => {
    event.removeVanillaTrades('minecraft:farmer', 4);
    event.removeVanillaTrades('immersiveengineering:machinist', 1)
    event.removeVanillaTrades('immersiveengineering:machinist', 4)
    event.removeVanillaTrades('immersiveengineering:machinist', 5)

    event.removeVanillaTrades('immersiveengineering:electrician', 1)
    event.removeVanillaTrades('immersiveengineering:electrician', 4)
    event.removeVanillaTrades('immersiveengineering:electrician', 5)

    event.removeVanillaTrades('pneumaticcraft:mechanic', 1)
    event.removeVanillaTrades('pneumaticcraft:mechanic', 2)
    event.removeVanillaTrades('pneumaticcraft:mechanic', 5)

    event.removeVanillaTrades('ae2:fluix_researcher', 1)
    event.removeVanillaTrades('ae2:fluix_researcher', 2)
    event.removeVanillaTrades('ae2:fluix_researcher', 3)
    event.removeVanillaTrades('ae2:fluix_researcher', 4)

    event.removeModdedTrades();
});