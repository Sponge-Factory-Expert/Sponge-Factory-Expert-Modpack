WorldgenEvents.add(event => {
    const { anchors } = event

    event.addOre(ore => {
        ore.addTarget('#minecraft:stone_ore_replaceables', 'spongefactory:titanium_ore')
        ore.addTarget('minecraft:deepslate', 'spongefactory:deepslate_titanium_ore')

        ore.count([7])
            .squared()
            .triangleHeight(
                anchors.aboveBottom(1),
                anchors.absolute(16)
            )
        ore.size = 3
        ore.noSurface = 0.5
        ore.worldgenLayer = 'underground_ores'
        ore.chance = 0
    })
})