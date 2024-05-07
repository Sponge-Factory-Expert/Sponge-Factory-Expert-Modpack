ServerEvents.tags('item', event => {
    // 石灰石
    event.add('forge:limestone', 'create:limestone')
    event.add('forge:limestone', 'quark:limestone')

    // 磨制刚玉
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_red_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_violet_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_white_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_yellow_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_black_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_blue_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_indigo_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_green_corundum')
    event.add('spongefactory:polished_corundum', 'spongefactory:polished_orange_corundum')

    // 刚玉簇
    event.add('spongefactory:corundum_cluster', 'quark:red_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:violet_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:white_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:yellow_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:black_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:blue_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:indigo_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:green_corundum_cluster')
    event.add('spongefactory:corundum_cluster', 'quark:orange_corundum_cluster')

    // 锤子
    event.add('spongefactory:hammer', 'immersiveengineering:hammer')
    event.add('spongefactory:hammer', 'spongefactory:stone_hammer')

    // 升级矩阵
    event.remove('pneumaticcraft:upgrade_components', 'minecraft:lapis_lazuli')

    // 铁磁材料
    event.add('spongefactory:ferromagnetic_materials', 'minecraft:lodestone')
})

ServerEvents.tags('block', event => {
    // 乙醇
    event.add('spongefactory:ethanol','immersiveengineering:ethanol_fluid_block')
    event.add('spongefactory:ethanol','pneumaticcraft:ethanol')
})