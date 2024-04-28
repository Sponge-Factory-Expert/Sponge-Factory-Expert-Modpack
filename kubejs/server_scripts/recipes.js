ServerEvents.recipes(event => {

    addGeneratedOreRecipes(event, "copper")
    addGeneratedOreRecipes(event, "iron")

    // 生石灰
    event.custom({
        "type": "lychee:item_burning",
        "item_in": {"tag": "forge:limestone"},
        "post": {"type": "drop_item", "item": "spongefactory:quicklime"}
    })

    // 熟石灰
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:quicklime"},
        "block_in": {"blocks": ["minecraft:water"]},
        "post": [{"type": "drop_item", "item": "spongefactory:slaked_lime"}
            , {"type": "place", "block": "air"}]
    })
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:quicklime"},
        "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
        "post": [{"type": "drop_item", "item": "spongefactory:slaked_lime"}
            , {"type": "place", "block": "cauldron"}]
    })

    // 石锤
    event.shaped(Item.of('spongefactory:stone_hammer', 1),
        [
            ' SA',
            ' TS',
            'T  '
        ],
        {
            A: "minecraft:string",
            S: '#quark:stone_tool_materials',
            T: '#twilightforest:uncrafting_ignores_cost'
        }
    )
    // 木炭粉
    event.shapeless('mekanism:dust_charcoal', [Item.of('minecraft:charcoal'), 'spongefactory:stone_hammer'])
        .customIngredientAction('spongefactory:stone_hammer', "use_hammer")
    // 用于扣除石锤的耐久
    Ingredient.registerCustomIngredientAction("use_hammer", (itemstack, index, inventory) => {
        let hammer_nbt = inventory.extractItem(inventory.find(Item.of('spongefactory:stone_hammer')), 1, false).getNbt()
        hammer_nbt.Damage += 1
        itemstack.nbt = itemstack.nbt.merge(hammer_nbt)
        return itemstack
    })

    // 熔炉内衬
    event.custom({
        "type": "lychee:item_inside",
        "item_in": [
            {
                "item": "spongefactory:slaked_lime"
            },
            {
                "item": "spongefactory:slaked_lime"
            },
            {
                "item": "spongefactory:slaked_lime"
            },
            {
                "item": "minecraft:terracotta"
            },
            {
                "item": "minecraft:clay_ball"
            },
            {
                "item": "minecraft:clay_ball"
            },
            {
                "item": "minecraft:clay_ball"
            },
            {
                "item": "minecraft:clay_ball"
            }
        ],
        "block_in": {"blocks": ["minecraft:water"]},
        "post": {"type": "drop_item", "item": "spongefactory:furnace_lining"}
    })
    event.custom({
        "type": "lychee:item_inside",
        "item_in": [
            {
                "item": "spongefactory:slaked_lime"
            },
            {
                "item": "spongefactory:slaked_lime"
            },
            {
                "item": "spongefactory:slaked_lime"
            },
            {
                "item": "minecraft:terracotta"
            },
            {
                "item": "minecraft:clay_ball"
            },
            {
                "item": "minecraft:clay_ball"
            },
            {
                "item": "minecraft:clay_ball"
            },
            {
                "item": "minecraft:clay_ball"
            }
        ],
        "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
        "post": {"type": "drop_item", "item": "spongefactory:furnace_lining"}
    })

    // 三种熔炉
    event.remove({output:"quark:blackstone_furnace"})
    event.remove({output:"quark:deepslate_furnace"})
    event.remove({output:"minecraft:furnace"})
    event.shaped(Item.of('minecraft:furnace', 1),
        [
            'XXX',
            'XAX',
            'XXX'
        ],
        {
            X: "#forge:cobblestone",
            A: 'spongefactory:furnace_lining'
        }
    )
    event.shaped(Item.of('minecraft:furnace', 1),
        [
            'XXX',
            'XAX',
            'XXX'
        ],
        {
            X: "#blue_skies:cobblestone",
            A: 'spongefactory:furnace_lining'
        }
    )
    event.shaped(Item.of('quark:blackstone_furnace', 1),
        [
            'XXX',
            'XAX',
            'XXX'
        ],
        {
            X: "minecraft:blackstone",
            A: 'spongefactory:furnace_lining'
        }
    )
    event.shaped(Item.of('quark:deepslate_furnace', 1),
        [
            'XXX',
            'XAX',
            'XXX'
        ],
        {
            X: "minecraft:cobbled_deepslate",
            A: 'spongefactory:furnace_lining'
        }
    )
})

function addGeneratedOreRecipes(event, oreName) {
    addOreWashingRecipes(event, oreName)
    addOreGroundRecipes(event, oreName)
    addCharcoalDustMixture(event, oreName)
    addSmeltingMixtureRecipes(event, oreName)
}

function addOreWashingRecipes(event, oreName) {
    // 丢入水中
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:impure_crushed_" + oreName + "_ore"},
        "block_in": {"blocks": ["minecraft:water"]},
        "post": {"type": "drop_item", "item": "spongefactory:crushed_" + oreName + "_ore"}
    })
    // 丢入装水的炼药锅
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:impure_crushed_" + oreName + "_ore"},
        "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
        "post": {"type": "drop_item", "item": "spongefactory:crushed_" + oreName + "_ore"}
    })
    // 水+鼓风机
    event.recipes.create.splashing("spongefactory:crushed_" + oreName + "_ore", "spongefactory:impure_crushed_" + oreName + "_ore")
}

function addOreGroundRecipes(event, oreName) {
    // 使用石锤
    event.shapeless("spongefactory:ground_" + oreName + "_ore", [Item.of("spongefactory:crushed_" + oreName + "_ore"), 'spongefactory:stone_hammer'])
        .customIngredientAction('spongefactory:stone_hammer', "use_hammer")
    // 粉碎轮
    event.recipes.create.crushing("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
    // 热力粉碎机
    event.recipes.thermal.pulverizer("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
    // 通用机械粉碎机
    event.recipes.mekanismCrushing("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
    // 沉浸粉碎机
    event.recipes.immersiveengineeringCrusher("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
}

function addCharcoalDustMixture(event, oreName) {
    event.shapeless("spongefactory:charcoal_" + oreName + "_ore_mixture", [Item.of('mekanism:dust_charcoal'), "spongefactory:ground_" + oreName + "_ore"])
}

function addSmeltingMixtureRecipes(event, oreName) {
    event.smelting("minecraft:raw_" + oreName, "spongefactory:charcoal_" + oreName + "_ore_mixture")
}