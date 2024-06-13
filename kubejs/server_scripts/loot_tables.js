ServerEvents.blockLootTables(event => {
    //铁 8
    ironOreLootTable(event, 'minecraft:iron_ore')
    ironOreLootTable(event, 'minecraft:deepslate_iron_ore')
    ironOreLootTable(event, 'ad_astra:moon_iron_ore')
    ironOreLootTable(event, 'ad_astra:mars_iron_ore')
    ironOreLootTable(event, 'ad_astra:mercury_iron_ore')
    ironOreLootTable(event, 'ad_astra:glacio_iron_ore')
    ironOreLootTable(event,'deeperdarker:sculk_stone_iron_ore')
    ironOreLootTable(event, 'deeperdarker:gloomslate_iron_ore')

    // 铜 5
    copperOreLootTable(event, 'minecraft:deepslate_copper_ore')
    copperOreLootTable(event, 'minecraft:copper_ore')
    copperOreLootTable(event, 'ad_astra:glacio_copper_ore')
    copperOreLootTable(event, 'deeperdarker:sculk_stone_copper_ore')
    copperOreLootTable(event, 'deeperdarker:gloomslate_copper_ore')

    // 锌 2
    zincOreLootTable(event, 'create:zinc_ore')
    zincOreLootTable(event, 'create:deepslate_zinc_ore')

    // 金 6
    goldOreLootTable(event, 'minecraft:gold_ore')
    goldOreLootTable(event, 'minecraft:deepslate_gold_ore')
    goldOreLootTable(event, 'ad_astra:venus_gold_ore')
    goldOreLootTable(event, 'mythicbotany:gold_ore')
    goldOreLootTable(event, 'deeperdarker:gloomslate_gold_ore')
    goldOreLootTable(event, 'deeperdarker:sculk_stone_gold_ore')

    // 银 6
    sliverOreLootTable(event, 'occultism:silver_ore')
    sliverOreLootTable(event, 'occultism:silver_ore_deepslate')
    sliverOreLootTable(event, 'immersiveengineering:ore_silver')
    sliverOreLootTable(event, 'immersiveengineering:deepslate_ore_silver')
    sliverOreLootTable(event, 'thermal:silver_ore')
    sliverOreLootTable(event, 'thermal:deepslate_silver_ore')

    // 镍 4
    nickelOreLootTable(event, 'immersiveengineering:ore_nickel')
    nickelOreLootTable(event, 'immersiveengineering:deepslate_ore_nickel')
    nickelOreLootTable(event, 'thermal:nickel_ore')
    nickelOreLootTable(event, 'thermal:deepslate_nickel_ore')

    // 铝 2
    aluminumOreLootTable(event, 'immersiveengineering:ore_aluminum')
    aluminumOreLootTable(event, 'immersiveengineering:deepslate_ore_aluminum')

    // 锡 4
    tinOreLootTable(event, 'mekanism:tin_ore')
    tinOreLootTable(event, 'mekanism:deepslate_tin_ore')
    tinOreLootTable(event, 'thermal:tin_ore')
    tinOreLootTable(event, 'thermal:deepslate_tin_ore')

    // 锇 2
    osmiumOreLootTable(event, 'mekanism:deepslate_osmium_ore')
    osmiumOreLootTable(event, 'mekanism:osmium_ore')

    // 铅 6
    leadOreLootTable(event, 'thermal:lead_ore')
    leadOreLootTable(event, 'thermal:deepslate_lead_ore')
    leadOreLootTable(event, 'mekanism:lead_ore')
    leadOreLootTable(event, 'mekanism:deepslate_lead_ore')
    leadOreLootTable(event, 'immersiveengineering:deepslate_ore_lead')
    leadOreLootTable(event, 'immersiveengineering:ore_lead')

    // 铀 4
    uraniumOreLootTable(event,'mekanism:uranium_ore')
    uraniumOreLootTable(event,'mekanism:deepslate_uranium_ore')
    uraniumOreLootTable(event,'immersiveengineering:deepslate_ore_uranium')
    uraniumOreLootTable(event,'immersiveengineering:ore_uranium')

    // 钛 2
    titaniumOreLootTable(event, 'spongefactory:titanium_ore')
    titaniumOreLootTable(event, 'spongefactory:deepslate_titanium_ore')

    let dropSelf = (block) => {
        event.addJson(block, {
            "type": "minecraft:block",
            "pools": [
                {
                    "bonus_rolls": 0.0,
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        }
                    ],
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "name": block
                        }
                    ],
                    "rolls": 1.0
                }
            ]
        })
    }

    dropSelf('ae2:mysterious_cube')
})

function copperOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "add": false,
                                        "count": {
                                            "type": "minecraft:uniform",
                                            "max": 5.0,
                                            "min": 2.0
                                        },
                                        "function": "minecraft:set_count"
                                    },
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": "spongefactory:impure_crushed_copper_ore"
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function ironOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": "spongefactory:impure_crushed_iron_ore"
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function sliverOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": "spongefactory:impure_crushed_silver_ore"
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function zincOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": "spongefactory:impure_crushed_zinc_ore"
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function goldOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": "spongefactory:impure_crushed_gold_ore"
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function nickelOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": "spongefactory:impure_crushed_nickel_ore"
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function aluminumOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [{
            "bonus_rolls": 0.0,
            "entries": [{
                "type": "minecraft:alternatives",
                "children": [{
                    "type": "minecraft:item",
                    "conditions": [{
                        "condition": "minecraft:match_tool",
                        "predicate": {"enchantments": [{"enchantment": "minecraft:silk_touch", "levels": {"min": 1}}]}
                    }],
                    "name": ore
                }, {
                    "type": "minecraft:item",
                    "functions": [{
                        "enchantment": "minecraft:fortune",
                        "formula": "minecraft:ore_drops",
                        "function": "minecraft:apply_bonus"
                    }, {"function": "minecraft:explosion_decay"}],
                    "name": 'spongefactory:impure_crushed_aluminum_ore'
                }]
            }],
            "rolls": 1.0
        }]
    })
}

function tinOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": 'spongefactory:impure_crushed_tin_ore'
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function osmiumOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [{
            "bonus_rolls": 0.0,
            "entries": [{
                "type": "minecraft:alternatives",
                "children": [{
                    "type": "minecraft:item",
                    "conditions": [{
                        "condition": "minecraft:match_tool",
                        "predicate": {"enchantments": [{"enchantment": "minecraft:silk_touch", "levels": {"min": 1}}]}
                    }],
                    "name": ore
                }, {
                    "type": "minecraft:item",
                    "functions": [{
                        "enchantment": "minecraft:fortune",
                        "formula": "minecraft:ore_drops",
                        "function": "minecraft:apply_bonus"
                    }, {"function": "minecraft:explosion_decay"}],
                    "name": 'spongefactory:impure_crushed_osmium_ore'
                }]
            }],
            "name": "main",
            "rolls": 1.0
        }]
    })
}

function leadOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": 'spongefactory:impure_crushed_lead_ore'
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}

function uraniumOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [{
            "bonus_rolls": 0.0,
            "entries": [{
                "type": "minecraft:alternatives",
                "children": [{
                    "type": "minecraft:item",
                    "conditions": [{
                        "condition": "minecraft:match_tool",
                        "predicate": {"enchantments": [{"enchantment": "minecraft:silk_touch", "levels": {"min": 1}}]}
                    }],
                    "name": ore
                }, {
                    "type": "minecraft:item",
                    "functions": [{
                        "enchantment": "minecraft:fortune",
                        "formula": "minecraft:ore_drops",
                        "function": "minecraft:apply_bonus"
                    }, {"function": "minecraft:explosion_decay"}],
                    "name": 'spongefactory:impure_crushed_uranium_ore'
                }]
            }],
            "name": "main",
            "rolls": 1.0
        }]
    })
}

function titaniumOreLootTable(event, ore) {
    event.addJson(ore, {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "entries": [
                    {
                        "type": "minecraft:alternatives",
                        "children": [
                            {
                                "type": "minecraft:item",
                                "conditions": [
                                    {
                                        "condition": "minecraft:match_tool",
                                        "predicate": {
                                            "enchantments": [
                                                {
                                                    "enchantment": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "name": ore
                            },
                            {
                                "type": "minecraft:item",
                                "functions": [
                                    {
                                        "enchantment": "minecraft:fortune",
                                        "formula": "minecraft:ore_drops",
                                        "function": "minecraft:apply_bonus"
                                    },
                                    {
                                        "function": "minecraft:explosion_decay"
                                    }
                                ],
                                "name": 'spongefactory:impure_crushed_titanium_ore'
                            }
                        ]
                    }
                ],
                "rolls": 1.0
            }
        ]
    })
}