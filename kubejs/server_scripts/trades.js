MoreJSEvents.villagerTrades((event) => {
    event.removeVanillaTrades('minecraft:farmer', 4);
    event.removeModdedTrades('immersiveengineering:machinist', 1)
    event.removeModdedTrades('immersiveengineering:machinist', 4)
    event.removeModdedTrades('immersiveengineering:machinist', 5)

    event.removeModdedTrades('immersiveengineering:electrician', 1)
    event.removeModdedTrades('immersiveengineering:electrician', 4)
    event.removeModdedTrades('immersiveengineering:electrician', 5)
});