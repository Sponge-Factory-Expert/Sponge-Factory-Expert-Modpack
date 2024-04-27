ServerEvents.recipes(event => {
    // 删除所有输出铁锭的配方，包括模组的配方
    event.remove({output: 'minecraft:iron_ingot'})
    event.remove({output: 'minecraft:netherite_sword'})
})