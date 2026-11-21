<?php

/**
 * MapData.php
 *
 * Fixed facts about the map printed on the board: the 22 location spaces and the
 * routes between them. This never changes during a game.
 *
 * A space is NOT a location disc. The outpost/farm/town/feudum discs are pieces
 * that are shuffled at setup and swapped when improved, so which disc sits on
 * which space is game state and belongs in the database, not here.
 *
 * Coordinates are the center of the printed circle, in board pixels
 * (img/board.webp is 4096 x 1560, the same system used by BOARD_VIEWS in Game.js).
 */

declare(strict_types=1);

namespace Bga\Games\FeudumFlutes;

class MapData
{
    // Regions, in the same order as the progress die faces.
    public const REGION_SEA = 'sea';
    public const REGION_ISLAND = 'island';
    public const REGION_FOREST = 'forest';
    public const REGION_DESERT = 'desert';
    public const REGION_BADLANDS = 'badlands';
    public const REGION_MOUNTAIN = 'mountain';

    // Route types (rulebook p.8-9). Roads are the grey paths.
    // Vessel routes are shown on the board as textures, not lines:
    // submersible = dotted water, ship = "^" waves, flying machine = "v" birds.
    // Ferryboat routes are the rivers marked with a shilling-and-boat icon at each end.
    public const ROUTE_ROAD = 'road';
    public const ROUTE_SHIP = 'ship';
    public const ROUTE_SUBMERSIBLE = 'submersible';
    public const ROUTE_FLYING_MACHINE = 'flyingMachine';
    public const ROUTE_FERRYBOAT = 'ferryboat';

    /**
     * The 22 location spaces, keyed by id.
     *
     * Ids are "<region>-<compass letters>" where the board prints a compass label.
     * Spaces without a label are named after a landmark drawn in or beside the circle.
     *
     * - region: one of the REGION_ constants
     * - x, y: center of the circle in board pixels
     * - isStartingLocation: circled in pink (Migrate, p.8; setup, p.4)
     * - compass: the printed letters, or null. Goods go to spaces containing "N"
     *   at setup and "S" / "E" / "W" when the map is replenished, so check with
     *   str_contains(), because "NW" counts for both N and W.
     */
    public const SPACES = [
        // Sea (small islands)
        'sea-n' => [
            'region' => self::REGION_SEA,
            'x' => 940,
            'y' => 430,
            'isStartingLocation' => false,
            'compass' => 'N',
        ],
        'sea-sw' => [
            'region' => self::REGION_SEA,
            'x' => 835,
            'y' => 685,
            'isStartingLocation' => false,
            'compass' => 'SW',
        ],
        'sea-e' => [
            'region' => self::REGION_SEA,
            'x' => 1580,
            'y' => 655,
            'isStartingLocation' => false,
            'compass' => 'E',
        ],

        // Island (big islands)
        'island-n' => [
            'region' => self::REGION_ISLAND,
            'x' => 1205,
            'y' => 630,
            'isStartingLocation' => false,
            'compass' => 'N',
        ],
        'island-e' => [
            'region' => self::REGION_ISLAND,
            'x' => 1415,
            'y' => 850,
            'isStartingLocation' => false,
            'compass' => 'E',
        ],
        'island-w' => [
            'region' => self::REGION_ISLAND,
            'x' => 900,
            'y' => 980,
            'isStartingLocation' => false,
            'compass' => 'W',
        ],
        'island-s' => [
            'region' => self::REGION_ISLAND,
            'x' => 1150,
            'y' => 1160,
            'isStartingLocation' => false,
            'compass' => 'S',
        ],

        // Forest
        'forest-nw' => [
            'region' => self::REGION_FOREST,
            'x' => 1352,
            'y' => 400,
            'isStartingLocation' => false,
            'compass' => 'NW',
        ],
        'forest-pond' => [
            'region' => self::REGION_FOREST,
            'x' => 1828,
            'y' => 435,
            'isStartingLocation' => true,
            'compass' => null,
        ],
        'forest-se' => [
            'region' => self::REGION_FOREST,
            'x' => 2172,
            'y' => 605,
            'isStartingLocation' => true,
            'compass' => 'SE',
        ],

        // Desert
        'desert-n' => [
            'region' => self::REGION_DESERT,
            'x' => 1780,
            'y' => 912,
            'isStartingLocation' => false,
            'compass' => 'N',
        ],
        'desert-sw' => [
            'region' => self::REGION_DESERT,
            'x' => 1552,
            'y' => 1198,
            'isStartingLocation' => false,
            'compass' => 'SW',
        ],
        'desert-crossroads' => [
            'region' => self::REGION_DESERT,
            'x' => 1935,
            'y' => 1135,
            'isStartingLocation' => true,
            'compass' => null,
        ],
        'desert-oasis' => [
            'region' => self::REGION_DESERT,
            'x' => 2273,
            'y' => 942,
            'isStartingLocation' => true,
            'compass' => null,
        ],
        'desert-e' => [
            'region' => self::REGION_DESERT,
            'x' => 2557,
            'y' => 1128,
            'isStartingLocation' => false,
            'compass' => 'E',
        ],

        // Badlands
        'badlands-nw' => [
            'region' => self::REGION_BADLANDS,
            'x' => 2340,
            'y' => 365,
            'isStartingLocation' => true,
            'compass' => 'NW',
        ],
        'badlands-peaks' => [
            'region' => self::REGION_BADLANDS,
            'x' => 2715,
            'y' => 460,
            'isStartingLocation' => false,
            'compass' => null,
        ],
        'badlands-dock' => [
            'region' => self::REGION_BADLANDS,
            'x' => 2520,
            'y' => 690,
            'isStartingLocation' => false,
            'compass' => null,
        ],
        'badlands-pond' => [
            'region' => self::REGION_BADLANDS,
            'x' => 2833,
            'y' => 790,
            'isStartingLocation' => true,
            'compass' => null,
        ],
        'badlands-se' => [
            'region' => self::REGION_BADLANDS,
            'x' => 2948,
            'y' => 1070,
            'isStartingLocation' => false,
            'compass' => 'SE',
        ],

        // Mountain
        'mountain-nw' => [
            'region' => self::REGION_MOUNTAIN,
            'x' => 3150,
            'y' => 380,
            'isStartingLocation' => false,
            'compass' => 'NW',
        ],
        'mountain-se' => [
            'region' => self::REGION_MOUNTAIN,
            'x' => 3245,
            'y' => 735,
            'isStartingLocation' => false,
            'compass' => 'SE',
        ],
    ];

    /**
     * Routes between spaces. Each route is listed once and works in both directions.
     *
     * TODO: ship, submersible and flying machine routes are not transcribed yet.
     * They are drawn as textured bands (see ROUTE_ constants), and need checking
     * against the board with the debug overlay before they are trusted.
     */
    public const CONNECTIONS = [
        // Roads
        ['from' => 'forest-nw', 'to' => 'forest-pond', 'type' => self::ROUTE_ROAD],
        ['from' => 'forest-pond', 'to' => 'forest-se', 'type' => self::ROUTE_ROAD],
        ['from' => 'forest-pond', 'to' => 'badlands-nw', 'type' => self::ROUTE_ROAD],
        ['from' => 'forest-se', 'to' => 'badlands-nw', 'type' => self::ROUTE_ROAD],
        ['from' => 'forest-se', 'to' => 'desert-oasis', 'type' => self::ROUTE_ROAD],
        ['from' => 'island-n', 'to' => 'island-e', 'type' => self::ROUTE_ROAD],
        ['from' => 'island-w', 'to' => 'island-s', 'type' => self::ROUTE_ROAD],
        ['from' => 'desert-n', 'to' => 'desert-crossroads', 'type' => self::ROUTE_ROAD],
        ['from' => 'desert-crossroads', 'to' => 'desert-oasis', 'type' => self::ROUTE_ROAD],
        ['from' => 'desert-sw', 'to' => 'desert-e', 'type' => self::ROUTE_ROAD],
        ['from' => 'badlands-nw', 'to' => 'badlands-peaks', 'type' => self::ROUTE_ROAD],
        ['from' => 'badlands-peaks', 'to' => 'badlands-pond', 'type' => self::ROUTE_ROAD],
        ['from' => 'mountain-nw', 'to' => 'mountain-se', 'type' => self::ROUTE_ROAD],

        // Ferryboats (2 shillings per one-way trip; closed while the Alchemist has vessels for sale)
        ['from' => 'desert-oasis', 'to' => 'desert-e', 'type' => self::ROUTE_FERRYBOAT],
        ['from' => 'badlands-pond', 'to' => 'mountain-se', 'type' => self::ROUTE_FERRYBOAT],
        // VERIFY: the river from forest-pond reaches the lake, and island-n has the other ferry icon.
        ['from' => 'forest-pond', 'to' => 'island-n', 'type' => self::ROUTE_FERRYBOAT],
    ];
}
