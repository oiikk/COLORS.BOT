const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder, 
  PermissionsBitField,
  AttachmentBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});



// 🎨 آي دي رولات الألوان
const colorRoles = {
  "1": "1468898426098810930",
  "2": "1468898394163515484",
  "3": "1468898455777841224",
  "4": "1468898521968021537",
  "5": "1468898486610165823",
  "6": "1468898549294174291",
  "7": "1468898576196174008",
  "8": "1468898603387850816",
  "9": "1468898632970272810",
  "10": "1468900281466093731",
  "11": "1468900473439391797",
  "12": "1468900375657578670"
};

client.on("ready", () => {
  console.log(`${client.user.tag} شغال 🔥`);
});

client.on("messageCreate", async (message) => {

  if (message.content === "!colors") {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ هذا الأمر للإدارة فقط.");
    }

    const menu = new StringSelectMenuBuilder()
      .setCustomId("color_select")
      .setPlaceholder("اختر اللون المناسب لك.")
      .addOptions([
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    const attachment = new AttachmentBuilder("colors.png");

    message.channel.send({
      content: "",
      files: [attachment],
      components: [row]
    });

  }

});

client.on("interactionCreate", async (interaction) => {

  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "color_select") return;

  // ⏳ Thinking
  await interaction.deferReply({ ephemeral: true });

  const selected = interaction.values[0];
  const member = interaction.member;

  // 🧹 حذف كل الألوان
  for (const roleId of Object.values(colorRoles)) {
    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId).catch(() => {});
    }
  }

  // ❌ إزالة اللون
  if (selected === "0") {
    return interaction.editReply({
      content: "تم ازالة اللون ."
    });
  }

  // ✅ إضافة اللون الجديد
  const newRole = colorRoles[selected];
  if (newRole) {
    await member.roles.add(newRole).catch(() => {});
  }

  interaction.editReply({
    content: `تم تغير اللون . ${selected}`
  });

});

client.login(process.env.TOKEN);
