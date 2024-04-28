ServerEvents.blockLootTables(event => {
    event.addJson("minecraft:iron_ore", {
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
                                "name": "minecraft:iron_ore"
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
    event.addJson("minecraft:deepslate_iron_ore", {
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
                                "name": "minecraft:deepslate_iron_ore"
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
    event.addJson("minecraft:copper_ore", {
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
                                "name": "minecraft:copper_ore"
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
    event.addJson("minecraft:deepslate_copper_ore", {
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
                                "name": "minecraft:deepslate_copper_ore"
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
})