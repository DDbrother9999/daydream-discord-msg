import 'dotenv/config';

import {
    Client,
    GatewayIntentBits,
    Events,
    REST,
    Routes,
    SlashCommandBuilder,
    MessageFlags,
    ContainerBuilder,
    TextDisplayBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SeparatorBuilder
} from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    new SlashCommandBuilder()
        .setName('daydream')
        .setDescription('displays info')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering commands');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Global slash commands registered ✅');
    } catch (error) {
        console.error(error);
    }
})();

client.once(Events.ClientReady, c => {
    console.log(`✅ Logged in as ${c.user.tag}`);
});

function getRandomPromptElements() {
    const gameTypes = [
        "puzzle game", "arcade game", "platformer", "racing game", "rhythm game",
        "physics game", "strategy game", "tower defense", "stealth game", "adventure game",
        "simulation", "management game", "survival game", "exploration game", "maze game",
        "matching game", "building game", "collecting game", "jumping game", "flying game",
        "shooting game", "defense game", "escape game", "rescue game", "cooking game",
        "drawing game", "music game", "word game", "memory game", "reaction game",
        "sorting game", "stacking game", "rolling game", "sliding game", "rotating game",
        "growing game", "shrinking game", "merging game", "splitting game", "timing game"
    ];

    const themes = [
        "animals", "space", "underwater", "robots", "magic", "pirates", "ninjas", "knights",
        "zombies", "aliens", "dinosaurs", "dragons", "ghosts", "monsters", "superheroes", "wizards",
        "cats", "dogs", "birds", "fish", "insects", "plants", "flowers", "trees",
        "food", "candy", "pizza", "ice cream", "vegetables", "fruits", "cooking", "baking",
        "music", "dancing", "art", "painting", "drawing", "colors", "shapes", "patterns",
        "weather", "seasons", "rain", "snow", "sun", "clouds", "storms", "rainbows",
        "vehicles", "cars", "trains", "planes", "boats", "rockets", "bicycles", "trucks",
        "sports", "soccer", "basketball", "tennis", "golf", "baseball", "swimming", "running",
        "school", "library", "playground", "home", "garden", "park", "beach", "mountain",
        "friendship", "family", "helping", "sharing", "learning", "growing", "exploring", "discovering"
    ];

    const settings = [
        "forest", "castle", "spaceship", "underwater city", "desert", "mountain", "cave", "laboratory",
        "school", "playground", "park", "beach", "farm", "circus", "carnival", "zoo",
        "kitchen", "bakery", "restaurant", "garden", "greenhouse", "library", "museum", "theater",
        "factory", "workshop", "garage", "basement", "attic", "treehouse", "island", "village",
        "city", "town", "neighborhood", "street", "alley", "rooftop", "bridge", "tower",
        "maze", "dungeon", "temple", "pyramid", "ruins", "volcano", "glacier", "jungle",
        "swamp", "meadow", "valley", "hill", "cliff", "river", "lake", "pond",
        "space station", "alien planet", "moon base", "asteroid", "comet", "black hole", "nebula", "galaxy",
        "pirate ship", "treasure island", "haunted house", "magic realm", "fairy tale land", "dreamworld", "candy land", "toy store"
    ];

    const randomChoice = (array) => array[Math.floor(Math.random() * array.length)];

    return {
        gameType: randomChoice(gameTypes),
        theme: randomChoice(themes),
        setting: randomChoice(settings)
    };
}


client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'daydream') {

            const components = new ContainerBuilder()
                .addMediaGalleryComponents(
                    new MediaGalleryBuilder().addItems(
                        new MediaGalleryItemBuilder()
                            .setURL('https://daydream.hackclub.com/daydream.png')
                            .setDescription('Daydream Hackathon Banner')
                    )
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "## NEW EVENT: [DAYDREAM](https://daydream.hackclub.com/)\n\n### WHAT is it?\nWe're running **100+ hackathons** for teenagers across the world. It's the **world’s biggest high‑school game jam** happening on **September 27th & 28th, 2025.**\n\n***Where is it?*** Events are happening everywhere! [Click here to check for events near you!](https://daydream.hackclub.com/map)"
                    )
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "**View past games!**"
                    )
                )
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('Creation: Not an Idle')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://nanomars.itch.io/not-an-idle'),
                        new ButtonBuilder()
                            .setLabel('Creation: Remedy Renemy')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://bucketfish.itch.io/remedy-renemy'),
                        new ButtonBuilder()
                            .setLabel('Creation: SPEEDTICKERS')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://juanes10201.itch.io/speedtickers')
                    )
                )
                .addSeparatorComponents(
                    new SeparatorBuilder().setDivider(true).setSpacing(1)
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "### WHO can sign up? :wave:\nDaydream is for **teenaged musicians, artists, developers** and anyone else (high schoolers + upper-middle-schoolers) interested.\n\n***Don't have any experience?*** No worries! We're running **workshops** and we're happy to help :heart:"
                    )
                )
                .addSeparatorComponents(
                    new SeparatorBuilder().setDivider(true).setSpacing(1)
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "### HOW do I participate? :tada:\n:pen_ballpoint: 1. **SIGN UP**: https://forms.hackclub.com/daydream-sign-up\n:red_car: 2. **SHOW UP** to an event near you\n:people_hugging: 3. **TEAM UP** with other teenagers (it's more fun together)\n:envelope: 4. **SHARE IT** for the world to see and enjoy :tada:"
                    )
                )
                .addSeparatorComponents(
                    new SeparatorBuilder().setDivider(true).setSpacing(1)
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "### FREE STUFF :money_with_wings:\n- Custom Stickers :fire:\n- Cool Merch (like T-Shirts) :shirt:\n- Food + Snacks :yum:\n\n***Don't know what to build?***"
                    )
                )
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('dream_idea')
                            .setLabel('Dream an Idea for me!')
                            .setStyle(ButtonStyle.Success)
                    )
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "\n\n***What are you waiting for?***"
                    )
                )
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('Sign Up Now')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://forms.hackclub.com/daydream-sign-up'),
                        new ButtonBuilder()
                            .setLabel('Find an Event')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://daydream.hackclub.com/map'),
                        new ButtonBuilder()
                            .setLabel('Visit Website')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://daydream.hackclub.com/')
                    )
                );

            await interaction.reply({
                components: [components],
                flags: MessageFlags.IsComponentsV2
            });
        }
    }

    else if (interaction.isButton()) {
        if (interaction.customId === 'dream_idea') {
            await interaction.deferReply({ ephemeral: true });

            try {
                const randomElements = getRandomPromptElements();
                const prompt = `Create a simple game idea for a beginner game jam.\n\nGAME TYPE: ${randomElements.gameType}\nTHEME: ${randomElements.theme}\nSETTING: ${randomElements.setting}\n\nTurn these three elements into a single sentence game idea. Start with "A [game type] where you..." or "An [game type] where you..." and keep it simple and clear. Use normal words, no fancy language.`;

                const response = await fetch('https://ai.hackclub.com/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: 'You are a practical game designer. Respond with ONLY a single sentence game idea. Use simple, plain language. One basic mechanic only. No fancy words, no poetry, no flowery descriptions.' },
                            { role: 'user', content: prompt }
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error(`AI API request failed: ${response.status}`);
                }

                const data = await response.json();
                let idea = data.choices[0]?.message?.content?.trim();

                if (!idea) {
                    throw new Error('No idea generated from AI response');
                }

                idea = idea.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                idea = idea.replace(/^["']/g, '').replace(/["']$/g, '').trim();

                await interaction.editReply({ content: `**${idea}**` });

            } catch (error) {
                console.error('Error generating game idea:', error);
                await interaction.editReply({ content: 'Sorry, I couldn\'t dream up an idea right now. Please try again later!' });
            }
        }
    }
});

client.login(process.env.TOKEN);

