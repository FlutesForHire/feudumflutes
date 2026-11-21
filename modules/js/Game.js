/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * FeudumFlutes implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

// To use the BGA libs, save their latest .d.ts files at the root of your game.
// Documentation and demos:
// https://doc.studio.boardgamearena.com/framework-documentation/front-end/libs/bga-animations/
// https://doc.studio.boardgamearena.com/framework-documentation/front-end/libs/bga-cards/
// Uncomment the following lines to load the libraries with their types:
// /** @type {typeof globalThis.BgaAnimations} */
// const BgaAnimations = await globalThis.importEsmLib('bga-animations', '1.x');
// /** @type {typeof globalThis.BgaCards} */
// const BgaCards = await globalThis.importEsmLib('bga-cards', '1.x');

const BOARD_WIDTH = 4096;
const BOARD_HEIGHT = 1560;
const BOARD_VIEWS = [
    { id: 'left-guilds',      x: 0,    y: 0,   width: 745,   height: 1560,   rotation: 90 },
    { id: 'right-guilds',     x: 3350, y: 0,   width: 745,   height: 1560,   rotation: -90 },
    { id: 'map-top-left',     x: 745,  y: 0,   width: 1560,  height: 780,    rotation: 0 },
    { id: 'map-top-right',    x: 1790, y: 0,   width: 1560,  height: 780,    rotation: 0 },
    { id: 'map-bottom-left',  x: 745,  y: 780, width: 1560,  height: 780,    rotation: 0 },
    { id: 'map-bottom-right', x: 1790, y: 780, width: 1560,  height: 780,    rotation: 0 },
    { id: 'map-middle-left',  x: 745,  y: 390, width: 1560,  height: 780,    rotation: 0 },
    { id: 'map-middle-right', x: 1790, y: 390, width: 1560,  height: 780,    rotation: 0 },
];
const DEFAULT_VIEW_ID = 'map-top-left';

/**
 * @typedef {Player & {
 *   energy: number
 * }} FeudumFlutesPlayer
 */
/**
 * @typedef {Gamedatas<FeudumFlutesPlayer> & {
 * }} FeudumFlutesGamedatas
 */
/**
* @typedef {Object} PlayerTurnArgs
* @property {number[]} playableCardsIds
*/

/**
 * We create one State class per declared state on the PHP side, to handle all state specific code here.
 * onEnteringState, onLeavingState and onPlayerActivationChange are predefined names that will be called by the framework.
 * When executing code in this state, you can access the args using this.args
 */
class PlayerTurn {
    /** @type {PlayerTurnArgs} */
    args;

    /**
     * @param {Game} game
     * @param {Bga} bga
     */
    constructor(game, bga) {
        this.game = game;
        this.bga = bga;
    }

    /**
     * This method is called each time we are entering the game state. You can use this method to perform some user interface changes at this moment.
     * 
     * @param {PlayerTurnArgs} args 
     * @param {boolean} isCurrentPlayerActive 
     */
    onEnteringState(args, isCurrentPlayerActive) {
        this.bga.statusBar.setTitle(isCurrentPlayerActive ? 
            _('${you} must play a card or pass') :
            _('${actplayer} must play a card or pass')
        );
      
        if (isCurrentPlayerActive) {
            const playableCardsIds = args.playableCardsIds; // returned by the PlayerTurn::getArgs

            // Add test action buttons in the action status bar, simulating a card click:
            playableCardsIds.forEach(
                cardId => this.bga.statusBar.addActionButton(_('Play card with id ${card_id}').replace('${card_id}', `${cardId}`), () => this.onCardClick(cardId))
            ); 

            this.bga.statusBar.addActionButton(_('Pass'), () => this.bga.actions.performAction("actPass"), { color: 'secondary' }); 
        }
    }

    /**
     * This method is called each time we are leaving the game state. You can use this method to perform some user interface changes at this moment.
     * 
     * @param {PlayerTurnArgs} args 
     * @param {boolean} isCurrentPlayerActive 
     */
    onLeavingState(args, isCurrentPlayerActive) {
    }

    /**
     * This method is called each time the current player becomes active or inactive in a MULTIPLE_ACTIVE_PLAYER state. You can use this method to perform some user interface changes at this moment.
     * on MULTIPLE_ACTIVE_PLAYER states, you may want to call this function in onEnteringState using `this.onPlayerActivationChange(args, isCurrentPlayerActive)` at the end of onEnteringState.
     * If your state is not a MULTIPLE_ACTIVE_PLAYER one, you can delete this function.
     * 
     * @param {PlayerTurnArgs} args 
     * @param {boolean} isCurrentPlayerActive 
     */
    onPlayerActivationChange(args, isCurrentPlayerActive) {
    }

    /**
     * @param {number} card_id 
     */
    onCardClick(card_id) {
        console.log('onCardClick', card_id);

        this.bga.actions.performAction("actPlayCard", { 
            card_id,
        }).then(() =>  {                
            // What to do after the server call if it succeeded
            // (most of the time, nothing, as the game will react to notifs / change of state instead, so you can delete the `then`)
        });        
    }
}

export class Game {
    /**
     * @param {Bga} bga
     */
    constructor(bga) {
        console.log('feudumflutes constructor');
        this.bga = bga;

        // Declare the State classes
        this.playerTurn = new PlayerTurn(this, bga);
        this.bga.states.register('PlayerTurn', this.playerTurn);

        // Uncomment the next line to show debug informations about state changes in the console. Remove before going to production!
        // this.bga.states.logger = console.log;
            
        // Here, you can init the global variables of your user interface
        // Example:
        // this.myGlobalValue = 0;
    }
    
    /*
        setup:
        
        This method must set up the game user interface according to current game situation specified
        in parameters.
        
        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)
        
        "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
    */
    
    /**
     * @param {FeudumFlutesGamedatas} gamedatas
     */
    setup(gamedatas) {
        console.log("Starting game setup", gamedatas);
        this.gamedatas = gamedatas;

        // Example to add a div on the game area
        this.bga.gameArea.getElement().insertAdjacentHTML('beforeend', `
            <div id="player-tables"></div>
        `);
        
        // Setting up player boards
        /*
        Object.values(gamedatas.players).forEach(player => {
            // example of setting up players boards
            this.bga.playerPanels.getElement(Number(player.id)).insertAdjacentHTML('beforeend', `
                <span id="energy-player-counter-${player.id}"></span> Energy
            `);
            const counter = new ebg.counter();
            counter.create(`energy-player-counter-${player.id}`, {
                value: player.energy,
                playerCounter: 'energy',
                playerId: Number(player.id)
            });

            // example of adding a div for each player
            document.getElementById('player-tables').insertAdjacentHTML('beforeend', `
                <div id="player-table-${player.id}">
                    <strong>${player.name}</strong>
                    <div>Player zone content goes here</div>
                </div>
            `);
        });
        */
        
        this.bga.gameArea.getElement().insertAdjacentHTML('beforeend', `
            <div id="game-table">
                <div id="minimap" class="minimap"></div>
                <div id="board-viewport" class="board-viewport">
                    <div id="board" class="board"></div>
                </div>
            </div>
            `);

        const minimap = document.getElementById('minimap');

        for (const view of BOARD_VIEWS) {
            const area = document.createElement('div');
            area.classList.add('minimap-area');
            area.style.left = (view.x / BOARD_WIDTH * 100) + '%';
            area.style.top = (view.y / BOARD_HEIGHT * 100) + '%';
            area.style.width = (view.width / BOARD_WIDTH * 100) + '%';
            area.style.height = (view.height / BOARD_HEIGHT * 100) + '%';
            area.dataset.viewId = view.id;
            area.addEventListener('click', () => this.showBoardView(view));
            minimap.appendChild(area);
        }

        const defaultView = BOARD_VIEWS.find(view => view.id === DEFAULT_VIEW_ID);
        this.showBoardView(defaultView);

        const viewport = document.getElementById('board-viewport');
        const resizeObserver = new ResizeObserver(() => this.showBoardView(this.currentView));
        resizeObserver.observe(viewport);

        // Setup game notifications to handle (see "setupNotifications" method below)
        this.setupNotifications();

        console.log( "Ending game setup" );
    }

    ///////////////////////////////////////////////////
    //// Utility methods
    
    /*
    
        Here, you can defines some utility methods that you can use everywhere in your javascript
        script. Typically, functions that are used in multiple state classes or outside a state class.
    
    */

    /**
     * Moves and rotates the board behind the viewport so the given preset view fills it.
     * Called when a minimap area is clicked and when the page is loaded.
     */
    showBoardView(view) {
        this.currentView = view;
        const board = document.getElementById('board');
        const viewport = document.getElementById('board-viewport');
        let shiftX = 0;
        let shiftY = 0;
        let widthOnScreen = view.width;
        if (view.rotation === 90) {
            shiftX = view.height;
            widthOnScreen = view.height;
        } else if (view.rotation === -90) {
            shiftY = view.width;
            widthOnScreen = view.height;
        }

        const scale = viewport.clientWidth / widthOnScreen;

        // CSS applies these right to left: move the view's corner to (0,0), rotate, shift back into the window, then scale.
        board.style.transform =
            `scale(${scale}) translate(${shiftX}px, ${shiftY}px) rotate(${view.rotation}deg) translate(${-view.x}px, ${-view.y}px)`;
        
        const minimapAreas = document.querySelectorAll('.minimap-area');
        for (const area of minimapAreas) {
            if (area.dataset.viewId === view.id) {
                area.classList.add('minimap-area-current');
            } else {
                area.classList.remove('minimap-area-current');
            }
        }

    }

    
    ///////////////////////////////////////////////////
    //// Reaction to cometD notifications

    /*
        setupNotifications:
        
        In this method, you associate each of your game notifications with your local method to handle it.
        
        Note: game notification names correspond to "bga->notify->all" calls in your Game.php file.
    
    */
    setupNotifications() {
        console.log( 'notifications subscriptions setup' );
        
        // automatically listen to the notifications, based on the `notif_xxx` function on this class. 
        // Uncomment the logger param to see debug information in the console about notifications.
        this.bga.notifications.setupPromiseNotifications({
            // logger: console.log
        });
    }
    
    // TODO: from this point and below, you can write your game notifications handling methods
    
    /*
    Example:
    async notif_cardPlayed( args ) {
        // Note: args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
        
        // TODO: play the card in the user interface.
    }
    */
}
