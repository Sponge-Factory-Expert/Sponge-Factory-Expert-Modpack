ServerEvents.recipes(event => {
    // 删除所有输出铁锭的配方，包括模组的配方
    event.remove({output: 'minecraft:iron_ingot'})
    event.remove({output: 'minecraft:netherite_sword'})
})
ServerEvents.entityLootTables(event => {
    /*
        把僵尸的铁锭战利品删除了。先从data/minecraft/loot_tables/entities/zombie.json复制了原版的战利品表，然后手动删除了铁锭，再使用addJson方法覆盖原先的战利品表
        可能有跟简单的，但是我不知道
    */
    event.addJson("minecraft:zombie",{
        "type": "minecraft:entity",
        "pools": [
          {
            "bonus_rolls": 0.0,
            "entries": [
              {
                "type": "minecraft:item",
                "functions": [
                  {
                    "add": false,
                    "count": {
                      "type": "minecraft:uniform",
                      "max": 2.0,
                      "min": 0.0
                    },
                    "function": "minecraft:set_count"
                  },
                  {
                    "count": {
                      "type": "minecraft:uniform",
                      "max": 1.0,
                      "min": 0.0
                    },
                    "function": "minecraft:looting_enchant"
                  }
                ],
                "name": "mekanism:advanced_tier_installer"
              }
            ],
            "rolls": 1.0
          },
          {
            "bonus_rolls": 0.0,
            "conditions": [
              {
                "condition": "minecraft:killed_by_player"
              },
              {
                "chance": 0.025,
                "condition": "minecraft:random_chance_with_looting",
                "looting_multiplier": 0.01
              }
            ],
            "entries": [
              {
                "type": "minecraft:item",
                "name": "minecraft:carrot"
              },
              {
                "type": "minecraft:item",
                "functions": [
                  {
                    "conditions": [
                      {
                        "condition": "minecraft:entity_properties",
                        "entity": "this",
                        "predicate": {
                          "flags": {
                            "is_on_fire": true
                          }
                        }
                      }
                    ],
                    "function": "minecraft:furnace_smelt"
                  }
                ],
                "name": "minecraft:potato"
              }
            ],
            "rolls": 1.0
          }
        ]
      }
    )
})