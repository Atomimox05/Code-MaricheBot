//Antes de empezar, les recomiendo no hacer copy&paste, si quieres aprender la lógica de los comandos y para que sirve cada variable, es mejor escribir, ver e interpretar, asi aprendi yo. Le agradezco a xSmau por dar mis primeros pasos en la creación de este bot y a lo que llegó.

//Cree este bot por la necesidad del sever de sus propios comandos y por hobby. Termine aprendiendo bastante sobre el mundo de la programación, y si es un poco fastidioso pero maravilloso.

//Usen sabiamente este código, hay muchos comandos utiles y divertidos y de un buen rato no se van a perder.

//No olvides dar créditos ;)


const Discord = require("discord.js");
const client = new Discord.Client({ ws: { intents: Discord.Intents.NON_PRIVILEGED }}); //Actualizacion del 12 de octubre. Menos de 100 servidores.
const config = require("./config.json");
const package = require("../package.json"); //Enlace al package.json
const chance = require("chance").Chance(); //NPM requerido del comando anonymous.

let prefix = config.prefix;
let version = package.version; //Versión del bot

let cooldown= new Set(); //Slowmode de comandos

// Activacion, estados personalizados

const activities_list = [
  "Maldita sea",
  "¡Chávez Vive!",
  "Aceptar bonos",
  "#PipepaChuy",
  "Maiz de finca lo mama bien mamao",
  "Pipe pa omar",
  "m;donar",
  "Petare",
  "Culo Peluo",
  "Hecho por Atomimox",
  "Recuperar el esequibo",
  "Hecho en socialismo",
  "m;help",
  "Mariche Lvl. 2",
  "Canaima gamer",
  "patria.org.ve",
  "Sabotear clases online",
  "Banear papulinces",
  "Gerardo furry",
  "PornHub",
  "Antimaterian't",
  "Umi afloja esa totona",
  "xvideos.com",
  "xnxx.com",
  "1° Aniversario Mariche"
  ]; //Puedes cambiar los estados a tu gusto

client.on("ready", () => {
 console.log(`Activo en la mamadera de culos.`);
 setInterval(() => {
   const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
   client.user.setActivity(activities_list[index]); 
 }, 6000); //Cambio de estado cada 6s, puedes cambiarlo a tu gusto, igualmente.
  status: "online";
});

//////////BIENVENIDAS POR MD////////////

client.on('guildMemberAdd', (member) => {

  let msgChannel = new Discord.MessageEmbed()

.setAuthor("Hola "+member.user.username, client.user.displayAvatarURL())
.setDescription("**¡Bienvenido(a) a " +member.guild.name+ " <a:tat:698616861272571975><a:cucarachadance:677342604857442308>.")
.setFooter("Nuestra cantidad de miembros actual es de "+member.guild.memberCount+". Esperamos que disfrutes el server. ¡No olvides verificarte para ver los demás chats!")
.setImage("https://cdn.discordapp.com/attachments/691179999134351380/748276244675559431/66789646_66789645.jpg")
.setColor("RANDOM");
member.send(msgChannel);

});

////////////COMANDOS///////////////

//Los emotes y las imágenes utilizadas se encuentran en un servidor privado. Es necesario cambiarlos para el buen funcionamiento de los comandos que quieras usar.

client.on('message', (message) => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.content.startsWith(prefix + "help")) {  //Comando Help

    const ayuda = new Discord.MessageEmbed()
    .setAuthor("Menú de comandos disponibles", client.user.displayAvatarURL())
    .setDescription("Qlq mano, estos son mis comandos.")
    .addField("Comandos de ADMIN/MOD", "`embeds`, `sanciones`")
    .addField("Comandos Informativos", "`actualizacion`, `donar`, `help`, `historia`, `mccs`, `samp`, `social`", true)
    .addField("Comandos Interactivos", "`amor`, `chavistometro`, `chimo`, `decir`, `gdfont`, `hack`, `papulince`, `peruanometro`, `pipe`, `skinmc`, `veneco`", true)
    .addField("Comandos de Imágenes", "`chavez`, `elmo`, `fango`, `funar`, `jking`, `maricheceltics`, `omar`, `panas`, `perezjimenez`", true)
    .addField("Comandos NFSW", "`daimanatetas`, `umiculo`", true)
    .addField("Comandos Útiles", "`avatar`, `avatarserver`, `botinfo`, `serverinfo`", true)
    .setFooter("Escribe m;[comando] || Desarrollado por: Atomimox#1935 para Mariche Party Night Club.")
  .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
  .setColor("RANDOM");
  message.channel.send(ayuda); //Estos son todos los comandos que tiene el bot.
  } else

  if(message.content.startsWith(prefix + "actualizacion")) { //Comando actualización

    const actualizacion = new Discord.MessageEmbed()
    .setTitle("Actualización del bot "+version+" :mailbox_with_mail:") //La variable "version" muestra la versión del bot desde el package.json
    .setThumbnail("https://cdn.discordapp.com/attachments/691179999134351380/728831844463673414/settings.png")
    .setDescription("El bot se actualiza cada cierto tiempo para corregir errores en los comandos o para agregar nuevos. Esta actualización es una versión alpha de la próxima versión (3.0.0) que tiene como objetivo traer una parte de los mayores comandos que serán implementados para el bot, por lo tanto esta versión puede ser inestable y llena de bugs.  Por otra parte tenemos:\n\n- Cambio de nombre del comando **anonymous** --> **hack**.\n- Cambios mínimos dentro del código del bot para hacerlo más optimo para la siguiente versión.\n\nNota: Algunos comandos serán desactivados por su poco uso en la próxima actualización.\n\n El código fuente del está liberado para los que quieran aprender a hacer bots con Discord.js. Puedes encontrarlo en [GitHub](https://github.com/Atomimox05/Code-MaricheBot). Gracias por su apoyo :sparkling_heart:.")
    .setColor("RANDOM")
    .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
    .setFooter("Fecha de actualización: 13/10/20");
    message.channel.send(actualizacion);

    message.delete({ timeout: 1000 }) //Mensaje del usuario eliminado en 1s
  } else

  if(message.content.startsWith(prefix + "embeds")) {

      if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) { //Permiso necesario: Editar canales
        return message.channel.send("**NO PUEDO MOSTRAR ESTE COMANDO**")
      }
  
      if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(":x: **"+message.author.username+", necesitas ser parte del staff para usar este comando.**")}
  
      const helpmods = new Discord.MessageEmbed()
      .setTitle("Embeds de información :memo:")
      .setDescription("Reglas: `2003maricherules2003`\nInformación: `2002maricheinfo2002`\n\nSiempre estoy a la orden para ayudarlo, jefe.")
      .setFooter("Solo puedes usar este comando en los canales de Información y Reglas.")
      .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
      .setColor("RANDOM");
      message.channel.send(helpmods);
  
      message.delete({ timeout: 1000 }) //Mensaje del autor borrado en 1s
  } else
  
  if(message.content.startsWith(prefix + "samp")) { //Comando SAMP

    const SAMP = new Discord.MessageEmbed()
    .setTitle("Aquí esta la info para jugar SAMP")
    .setDescription(":white_check_mark: Jugamos en el s1 y s5 de Fenixzone. Te puedes registrar con estos enlaces:\n**S1:** http://rol.fenixzone.com/nuevo.php?u=1451706\n**S5:** http://rol5.fenixzone.com/nuevo.php?u=1407190\nPuedes descargar el SAMP desde este enlace:\nhttps://www.sa-mp.com/download.php\n\nSi quieres más información comunicate con los que tienen el  rol <@&684452992711262281>")
    .setThumbnail("https://media.discordapp.net/attachments/691179999134351380/715733863057588265/samp.png?width=230&height=230")
    .setFooter("Información hecha por J_King09")
    .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
    .setColor("FDA746");
    message.channel.send(SAMP);
    } else

    if(message.content.startsWith(prefix + "botinfo")) {

      const botinfo = new Discord.MessageEmbed()
      .setAuthor("Información del bot",client.user.displayAvatarURL() )
      .setThumbnail(client.user.avatarURL())
      .setColor("RANDOM")
      .addField("Desarrollador", "Atomimox#1935")
      .addField("Versión", version, true)
      .addField("Programación", "`• Escrito en: Javascript\n• Librería: Discord.js v^12.2.0\n• Prefix: m;`", true)
      .addField("Creación", "Jueves, 28 de Mayo de 2020 a las 10:18:29 pm", true)
      .addField("ID", "715690490720419943", true)
      .addField("Bot privado", "Exclusivo para Mariche Country Club", true)
      .setFooter("Pedido por " + message.author.username);
      message.channel.send(botinfo);
    } else

    if(message.content.startsWith(prefix + "serverinfo")) {

      var server = message.guild;
  
      const svinfo = new Discord.MessageEmbed()
      .setThumbnail(server.iconURL({ dynamic: true }))
      .setAuthor(server.name, server.iconURL())
      .addField("ID", server.id, true)
      .addField("Region", server.region, true)
      .addField("Creado el", server.joinedAt.toDateString(), true)
      .addField("Dueño del servidor", server.owner.user.tag+' ('+server.owner.user.id +").", true)
      .addField("Miembros", server.memberCount, true)
      .setColor("RANDOM")
      .setFooter("Pedido por " + message.author.username);
      message.channel.send(svinfo);
    } else

    if(message.content.startsWith(prefix + "donar")) {

      message.channel.send(":white_check_mark: | **"+ message.author.username +"**, te he enviado los métodos de donación a tus mensajes privados.");
  
      let donaciones = new Discord.MessageEmbed()
      .setAuthor("Donaciones", client.user.displayAvatarURL())
      .setDescription("Puedes donar usando **PayPal**, por ahora. ¡Donando podrás mantener el bot en linea 24/7 y mejorar su host. ¿Que esperas? :heart:")
      .setThumbnail(client.user.avatarURL())
      .addField("PayPal", "[Click aquí para donar](https://paypal.me/atomimox05)")
      .addField("Beneficios de donar", "• Obtendrás el rol **Robotic**, que te otroga los mismos permisos que el **Antimateria**, incluso estarás por encima de dicho rol.\n• Estarás apoyando a que el bot sigua en línea y a otros proyectos en ejecución.")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter("Recuerda poner en la donación que es para el bot.");
      message.member.send(donaciones);
    } else

    if(message.content.startsWith(prefix + "social")) {

      const redes = new Discord.MessageEmbed()
      .setAuthor("Redes sociales del grupo", client.user.displayAvatarURL())
      .addField("<:facebook:739234723725049957> Grupos", "`◈` [Veneco Posting](https://www.facebook.com/groups/2091428504492194)\n`◈` [Veneco Pages](https://www.facebook.com/groups/214510926310461)")
      .addField("<:facebook:739234723725049957> Páginas", "`◈` [LambecucaYculo](https://www.facebook.com/Paposting)\n`◈` [Yutong Posteo](https://www.facebook.com/YutongPOSTING)\n`◈` [Ventilador Posteo](https://www.facebook.com/Ventiladorp0sting)\n`◈` [Toalla Posting](https://www.facebook.com/toallaposting)\n`◈` [6ix9ine Tocoron](https://www.facebook.com/6𝖎𝖝9𝖎𝖓𝖊-ᴛᴏᴄᴏʀᴏɴ-ꜱʜɪᴛᴘᴏꜱᴛɪɴɢ-103457908107529)", true)
      .addField("Otros Grupos", "`◈` <:whatsapplogo:739234929216323715> [Whatsapp](https://chat.whatsapp.com/FoxFrL6stlI1NAl5Npsegm)\n`◈` <:telegram:739235000259444766> [Telegram](https://t.me/marichepartyclubposteo)", true)
      .addField("<:facebook:739234723725049957> Otras  páginas", "`◈` [Jabon Azul.exe](https://www.facebook.com/Jabonposting)\n`◈` [Carajos de Discord Posteo](https://www.facebook.com/CarajosDeDiscordPosting)\n`◈` [Memes Socialistas](https://www.facebook.com/SocialistMeems)\n`◈` [Culo Cojio Posting](https://www.facebook.com/Culocojioposting)", true)
      .addField("<:discord:739235076466016267> Enlace de invitación al server", "https://discord.gg/ZrnyTGG", true)
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/691179999134351380/750067280351723580/118250053_170598374591148_7347259225567112420_n.png")
      .setFooter("Todos los enlaces son oficiales || Pedido por: "+message.author.username+".");
      message.channel.send(redes);
    } else

    if(message.content.startsWith(prefix + "amor")) {

      let users = message.mentions.users.map(m => m.username).join(' y '); //Mencion a 2 usuarios.
      if(!users) return message.channel.send(":heart_decoration: | Menciona a dos usuarios para calcular su amor. Ejemplo: `m;amor @user y @user1`");
            
      const random = Math.floor(Math.random() * 100); //Porcentaje al 100%
      let heard = ""; //Variable que mostrara un texto, en este caso un emote.
         
        if(random < 40){ //Menos de 40%
            heard=':broken_heart:';
        
        }else if(random < 80){ //Menos de 80%
            heard=':heart: ';
                
        }else if(random < 101){ //Menos del 100%
            heard=':sparkling_heart:';
        
          }
                    
        const love = new Discord.MessageEmbed()
          .setDescription('El porcentaje de amor de **'+users+'** es de: **'+random+' %**'+' '+heard)
          .setColor("RANDOM");
        
        message.channel.send(love);
    } else

    if(message.content.startsWith(prefix + "chavistometro")) {

      const Chaverandom = Math.floor(Math.random() * 100); //Porcentaje al 100%
  
      let usuario = message.mentions.users.first() || message.author; //Mencion a un usuario a nuestra persona.
  
      if (!usuario)
        return message.reply(":x: **Debes mencionar a alguien para medir su nivel de chavismo**");
  
      const chiave = new Discord.MessageEmbed()
      .setTitle("Chavistómetro <:thinkingchaves:655818056471281665> :stopwatch:")
      .setDescription("**"+ usuario.username +"** es "+Chaverandom+"% chavista.")
      .setColor("RANDOM");
      message.channel.send(chiave);
    } else

    if(message.content.startsWith(prefix + "pipe")) {
  
      const penis = Math.floor(Math.random() * 31); //Hasta de 30cm
  
      let miembroviril = message.mentions.users.first() || message.author;
  
      if (!miembroviril)
        return message.reply(":x: **Debes mencionar a alguien para ver su tamaño de pipe, ayyyy valeeeee, ike pendiente de un pipe** :gay_pride_flag:");
  
      const pipi = new Discord.MessageEmbed()
      .setTitle("Medidor de pipes :eggplant:")
      .setDescription("**"+ miembroviril.username +"** tiene un pipe de "+penis+"cm :flushed:")
      .setColor("RANDOM");
      message.channel.send(pipi);
    } else
  
    if(message.content.startsWith(prefix + "papulince")) {
  
      const papu = Math.floor(Math.random() * 100);
  
      let papulince = message.mentions.users.first() || message.author;
  
      if (!papulince)
        return message.reply(":x: **Debes mencionar a alguien para ver si es papulince :v**");
  
      const lince = new Discord.MessageEmbed()
      .setTitle("Verificador de papulinces <:pacman:732018407679197184> :stopwatch:")
      .setDescription("**"+ papulince.username +"** es "+papu+"% papulince :v")
      .setColor("RANDOM");
      message.channel.send(lince);
    } else

    if(message.content.startsWith(prefix + "peruanometro")) {
  
      const Perurandom = Math.floor(Math.random() * 100);
  
      let pelabola = message.mentions.users.first() || message.author;
  
      if (!pelabola)
        return message.reply(":x: **Debes mencionar a alguien para medir su nivel de peruano**");
  
      const peruano = new Discord.MessageEmbed()
      .setTitle("Peruanómetro :flag_pe: :stopwatch:")
      .setDescription("**"+ pelabola.username +"** es "+Perurandom+"% peruano.")
      .setColor("RANDOM");
      message.channel.send(peruano);
    } else

    if(message.content.startsWith(prefix + "veneco")) {
  
      const vzlarandom = Math.floor(Math.random() * 100);
  
      let veneco = message.mentions.users.first() || message.author;
  
      if (!veneco)
        return message.reply(":x: **Debes mencionar a alguien para medir su nivel de veneco**");
  
      const vezoenelano = new Discord.MessageEmbed()
      .setTitle("Venecómetro :flag_ve: :stopwatch:")
      .setDescription("**"+ veneco.username +"** es "+vzlarandom+"% veneco.")
      .setColor("RANDOM");
      message.channel.send(vezoenelano);
    } else

    if(message.content.startsWith(prefix + "chimo")) {
  
      let user = message.mentions.users.first() || message.author;
  
      if (!user)
        return message.reply(":x: **Debes mencionar a alguien para darle chimo mano, no seas pichirre**");
    
      if (user.id === message.author.id)
        return message.channel.send("**"+message.author.username+"**, toma chimo mano <:chimoeltigre:721433761207681105> :heart:");
    
        var mareo = [
          " <:chavezfinger:671813323993513996> <:chimoeltigre:721433761207681105>", //Normal
          ", pero se awebonio y se lo tragó <:rianse:728725836731121744>" //Tragao
        ]
      
      let felix = mareo[Math.floor(mareo.length * Math.random())];
      
        let chimo = new Discord.MessageEmbed()
        chimo.setColor("RANDOM")
        chimo.setDescription("**"+ message.author.username + "** le dio chimó a **" + user.username + "**" + felix);
        message.channel.send(chimo);
    } else

    if(message.content.startsWith(prefix + "decir")) {

        if(!args) return message.channel.send(":question: | **"+message.author.username+"** Debes escribir un mensaje a enviar.");
      message.channel.send(args.join(" "));//Argumentos a enviar
  
        message.delete({ timeout: 100 }) //Mensaje borrado en 0.10s
    } else

    if(message.content.startsWith(prefix + "umiculo")) {

      if(!message.channel.nsfw) //Permisos de canal NFSW
        return message.channel.send(":underage: | **"+message.author.username+"** Solo puedes usar este comando en un canal **NFSW**.")

     var umi = [
       "https://cdn.discordapp.com/attachments/691179999134351380/732817968932847623/107975180_188008902710886_3550510082212200037_o.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/720479013512151110/66486182_194389598237706_1805808644437049344_n.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731376683269226567/Ea06w1BXYAcqDlW.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/720478648318034032/D6j5I8wU8AAc6wD.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/720478590000562226/EEYm4ZBXkAAlwPl.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/720478890522574848/71698089_142262750373633_1689893202309414912_n.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/717614122241622096/f2babb55b2073022f69076a2fe10029c.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731377379230089236/Ecmyh2uUcAA7RZ-.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731377659334099024/EXCxjIbWkAEixPA.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731377802464722954/EcYBLEDX0AEAxR4.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731377979174813796/IMG_20200630_140016.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731378115145891860/IMG_20200630_135932.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731378291784810527/IMG_20200704_215836.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731378460001566780/IMG_20200706_042117.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731379072914948166/EXX6NT2U0AAi1LD.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731379469276938311/EWzarVpWAAEg1po.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731379747191521400/EWlohUCU4AIjKzt.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731379915898880030/EXTARGRWAAU-LEi.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731380291830022184/EVx1FiPWsAIG2YK.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731380581669273661/EaKQTgDXgAIlup3.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731380850591006801/EUOthmeWsAEB6KD.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731381258860625960/Ea6imkwXYAEayTT.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731381610846355567/IMG_20200511_212058.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/731381835204132964/IMG_20200515_135453.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/716866514611077120/Los_Cuidados_Necesarios_Para_Tener_Unas_Nalgas_De_Impacto.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/719013175227318272/Screenshot_7.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/734619604101365852/EcMm0MYXgAEKCya.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/734620111855681546/EdQHgqAWoAA8ykj.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/734622639955640380/EdDtbZZU0AAGVfV.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/734622856201371699/EdF6UiZXsAEE7C0.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/734623011734552587/ET_Bev7WoAAEXBS.png",
       "https://cdn.boob.bot/Gifs/15E1.gif",
       "https://cdn.discordapp.com/attachments/691179999134351380/734625534125801502/Ec1vqSsU4AAKusQ.png",
       "https://cdn.discordapp.com/attachments/691179999134351380/737869892799430776/EeDR9hEWAAA24cm.png",
       "https://es.pornhub.com/gif/1418511",
       "https://es.pornhub.com/gif/15490662",
       "https://es.pornhub.com/gif/3306541",
       "https://es.pornhub.com/gif/31437432",
       "https://es.pornhub.com/gif/1089341"
      ]

      let recto = umi[Math.floor(umi.length * Math.random())];

      let oluc = new Discord.MessageEmbed()
      oluc.setImage(recto)
      oluc.setColor("RANDOM")
      message.channel.send(oluc);
    } else

    if(message.content.startsWith(prefix + "perezjimenez")) {

      var marcos = [
        "https://cdn.discordapp.com/attachments/691179999134351380/728745391234744400/General_Marcos_Evangelista_Perez_Jimenez_Venezuela.jpg",
        "https://cdn.discordapp.com/attachments/691179999134351380/728747239270383756/9k.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/728747709070049340/DbojxFuW4AAy7Xc.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/728747861264695336/MarcosPerezJimenez2.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/728747997424386068/PC3A9rez-Jimenez-2-400x224.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/728748201678733322/marcosperez.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/728748508982804521/Screen-Shot-2019-09-06-at-16.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713674581901353/marcos-pc3a9rez-jimc3a9nez.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713966769832067/Marcos_Perez_Jimenez_por_Sava_Botzaris.png"
      ]

        let dictadura = marcos[Math.floor(marcos.length * Math.random())];

        let democracia = new Discord.MessageEmbed()
        democracia.setImage(dictadura)
        democracia.setFooter("En memoria del mejor presidente que a tenido Venezuela.")
        democracia.setColor("RANDOM")
      message.channel.send(democracia);
    } else

    if(message.content.startsWith(prefix + "panas")) {

      const keivver = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/691179999134351380/715782866767970354/FB_IMG_15897438932827345.jpg?width=520&height=276");
      message.channel.send(keivver); //Mensaje 1 (No sólo es un pana)
  
      var Panasfinos = [
      "https://media.discordapp.net/attachments/691179999134351380/715782808991301722/PicsArt_05-21-10.10.55.jpg?width=692&height=390",
      "https://media.discordapp.net/attachments/691179999134351380/728838676561395843/panayoshua.png?width=769&height=438",
      "https://cdn.discordapp.com/attachments/691179999134351380/728843842479980554/panasamuel.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/728843830035480668/pananefario.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/715782756449255536/PicsArt_05-17-03.52.01.jpg"
      ] //Mensaje 2 (Elige a un pana aleatorio)

      let miguel = Panasfinos[Math.floor(Panasfinos.length * Math.random())];

      let unverto = new Discord.MessageEmbed()
      unverto.setImage(miguel)
      message.channel.send(unverto);
    } else

    if(message.content.startsWith(prefix + "elmo")) {

      var pajizo = [
        "https://cdn.discordapp.com/attachments/674428708504993809/715791004648734781/yes.gif",
        "https://media.giphy.com/media/2uI9lqZaA8UjvapTkO/giphy.gif",
        "https://media.giphy.com/media/KGfXDTgL5U7huCwyOa/giphy.gif",
        "https://media.giphy.com/media/l0IyaO3cNkGYdr0Bi/giphy.gif",
        "https://media.giphy.com/media/YP8UjfBefffX2/giphy.gif",
        "https://media.giphy.com/media/12xiOA46vEYGl2/giphy.gif",
        "https://media.giphy.com/media/yxz4UaoXSm7PW/giphy.gif",
        "https://media.giphy.com/media/9jIl2YleeeEuI/giphy.gif",
        "https://media.giphy.com/media/H4s7qjFZk486I/giphy.gif",
        "https://media.giphy.com/media/qvYvNsD43kNXy/giphy.gif",
        "https://cdn.discordapp.com/attachments/691179999134351380/737460888231084102/deepfryelmoxd.png",
        "https://tenor.com/view/handjob-cum-jerk-jerking-cucumber-gif-16077971",
        "https://tenor.com/view/ejaculation-explosion-cumming-fall-ejaculating-gif-12807230",
        "https://tenor.com/view/brock-lesnar-wwe-brocklesnar-gif-9050907",
        "https://tenor.com/view/cum-jackoff-crank-down-gif-15221970"
        ]

      let gafo = pajizo[Math.floor(pajizo.length * Math.random())];

      let elmo = new Discord.MessageEmbed()
      elmo.setTitle("Modo Elmo :flushed::fire:<a:pajasad:696087646895865956>")
      elmo.setImage(gafo)
      elmo.setColor("RANDOM");
      message.channel.send(elmo);
    } else

    if(message.content.startsWith(prefix + "jking")) {

      const poceta = new Discord.MessageEmbed()
      .setTitle("J_King Posetiao :scream:")
      .setDescription("JKing chupao por la poceta")
      .setColor("RANDOM")
      .setImage("https://cdn.discordapp.com/attachments/691179999134351380/717188995045523506/53461682_993946227461557_3028485541826920448_n.png");
      message.channel.send(poceta);
    } else

    if(message.content.startsWith(prefix + "omar")) {

      var enrique = [
        "https://cdn.discordapp.com/attachments/691179999134351380/731952821624373288/Snapchat-1480645596.png",
        "https://media.discordapp.net/attachments/640286744813502486/716844764682518579/flash.gif",
        "https://cdn.discordapp.com/attachments/691179999134351380/757101605349752880/LAGRANESTAFA.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/716873825266171904/20200229_004739.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/716874661710790696/Snapchat-1273835330.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/716875225207144538/20191104_010632.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/716875411933364244/20191104_010027.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731952861554147370/Snapchat-1134920565.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/754089521943019610/Snapchat-1204235668.png",
        "https://cdn.discordapp.com/avatars/284717225925935104/b2251e1a161aece9dde89c064fbff4fd.png"
      ]

      let gay = enrique[Math.floor(enrique.length * Math.random())];

      let omar = new Discord.MessageEmbed()
      omar.setImage(gay)
      omar.setColor("RANDOM")
      message.channel.send(omar);
    } else

    if(message.content.startsWith(prefix + "funar")) {

      let miembro = message.mentions.users.first() || message.guild.members.resolve(args[0]); //Mención a usuario normal o con la ID

        if (!miembro)
      return message.reply(":x: | Debes mencionar a alguien para funarlo.");

        var darksouls = [
      "https://cdn.discordapp.com/attachments/691179999134351380/720503450730758255/wooshfunar.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/720477992689860628/31107078.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/720478099820642354/izv1fiber2t41.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017930175676486/9k.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017726689148958/30902723.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017817290178610/31589661.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017521121853440/Z.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017404788768828/JsLy6d3w_400x400.png",
      "https://cdn.discordapp.com/attachments/672539492313464832/718977726077337710/5d965e7b7df74.png",
      "https://cdn.discordapp.com/attachments/672539492313464832/718977768754511933/hqdefault.png",
      "https://cdn.discordapp.com/attachments/672539492313464832/718977810617729024/30870506.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/724743643411251231/FB_IMG_1565048993943.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/724744315066384514/meme.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/729572644067868772/FB_IMG_1593977992441.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/734629782473408512/Ec14-XwXgAA6bac.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/734629822394794054/EdFxCElXYAI4jtl.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/735307920257843280/FB_IMG_15953809402216622.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/754096102000558130/images.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/754096285593763941/maxresdefault.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/754096356628365379/images.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/754096549784453162/EcIla4aX0AAqB9P.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/754096763727642654/maxresdefault.png"
    ]

        let oruga = darksouls[Math.floor(darksouls.length * Math.random())];

        let funar = new Discord.MessageEmbed()
        funar.setColor("RANDOM")
        funar.setDescription("**"+ message.author.username + "** funó a **" + miembro.username + "**")
        funar.setImage(oruga);
        message.channel.send(funar);
    } else

    if(message.content.startsWith(prefix + "chavez")) {

      var hugo = [
        "https://cdn.discordapp.com/attachments/691179999134351380/722634677831204874/presidente-chavez-twitter_400x400.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722634744197677083/55090Hugo-Chavez.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722635067502886922/hugo-chavez-goberno-en-los-80-segun-la-invitada-vanessa-rivera-en-un-programa-de-fox.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722635131353038968/cdb3b3a6-494c-4d86-a992-2c933de34822.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722635845856657428/chavez.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722636007077445712/1059615758_09530721756_1000x541_80_0_0_ed88ee10cc266297f9592c18a6ce4234.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722636012420857886/oYKl9njSGUImL6xHZo6jno2cbFamkZBoFlp3LyNZGF02HTDv-n33Se5LZ9dJzNiL5SPrPxDvhR82tX5Hh4WQ2B8VCc6dvD1Qry2p.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722636176514744341/LHJ37FCEXNDDFD44XF5OYGK4UY.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722636223570640896/chavez12611.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722636274141233195/hugo-Chavezfeliznota.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/722636594800230510/hugochavez2.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713070602125392/75113_15016_1.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713226592747560/chaCC81vez.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713233676664923/HGhzIeaG2p_BvF0xhsLfqE6apHkwAbjTeKi0urss9RBVz-9DdXSIeRLZ_Vw0VlFN-V6sR_eMC5D21k-PY81BIQoAtr8IMNujc4fb.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713439357075507/db6f571bf6044399b9f3c4cc4b049ebc.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/731713547951669298/O4GmMfWfmT6lvZ9sv4CFmHZnOF9NLTFpAHnH7MvxGMm8U-M5qGJuYfisyYmcdGi4Sdnj6WomgG37K6eZfS_oARuyK1n3BCaS_vZZ.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/732013061644484638/107710236_3105512119528918_314541371128030049_n.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/732817889312112650/IMG_20200714_123630.png"
      ]

        let psuv = hugo[Math.floor(hugo.length * Math.random())];

        let frias = new Discord.MessageEmbed()
        frias.setImage(psuv)
        frias.setFooter("En memoria de nuestro comandante Chávez")
        frias.setColor("RANDOM")
      message.channel.send(frias);
    } else

    if(message.content.startsWith(prefix + "avatar")) {
        
      let perfil = message.mentions.users.first() || message.guild.members.resolve(args[0]) || message.author;

      if (!perfil)
        return message.reply(":x: | Menciona a alguien para ver su imagen de perfil.")

      const avatar = new Discord.MessageEmbed()
      .setTitle("Avatar de "+perfil.username)
      .setImage(perfil.displayAvatarURL({ size : 1024, dynamic: true })) //Hacer aparecer la imagen de tamaño 1024x1024 y animada.
      .setColor("RANDOM");
      message.channel.send(avatar);
    } else

    if(message.content.startsWith(prefix + "fango")) {

      var fango = [
        "https://cdn.discordapp.com/attachments/691179999134351380/735962990892941522/peta-demanda-a-un-fotografo-en-nombre-del-simio-que-se-tomo-una-selfie-1443144358.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735961719243014274/simio.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735961408604471336/1325075477_1.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735961472659620000/esclavos.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735962214850363453/110020565_2746556712241042_6528713676889213704_n.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/737454291404587129/FB_IMG_1593470617488.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/754092291999793183/FB_IMG_1596957167421.png",
        "​https://tenor.com/view/kiss-sexy-bye-hey-hi-gif-15318962",
        "https://cdn.discordapp.com/attachments/715068577232715867/746553895320289320/image0.jpg",
        "https://cdn.discordapp.com/attachments/640301597154345000/754094134402351134/Fango_patinando.png"
      ]

        let esclavo = fango[Math.floor(fango.length * Math.random())];

        let peru = new Discord.MessageEmbed()
        peru.setImage(esclavo)
        peru.setColor("RANDOM")
      message.channel.send(peru);
    } else

    if(message.content.startsWith(prefix + "avatarserver")) {
      
        var server = message.guild;
    
        const imgserver = new Discord.MessageEmbed()
        .setTitle("Imagen de "+server.name)
        .setImage(server.iconURL({ size: 1024, dynamic: true }))
        .setFooter("Pedido por " + message.author.username);
        message.channel.send(imgserver);
    } else

    if(message.content.startsWith(prefix + "skinmc")) {

        let skin = args.join(' ') //Nombre de la skin

        if (!args[0]) { //Si no proporciona el nombre de la skin
            return message.channel.send("Dime el nombre de una skin, por favor.") //Esto enviara un mensaje si no se envió el nombre de la skin
        }
    
        let url = `https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${skin}/700`;  //Esto sera la imagen de la skin
    
        const mcsskin = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(":mag: Resultado de búsqueda para: **"+skin+"**.")
        .setImage(url)
    message.channel.send(mcsskin) //Enviamos el embed al canal
    //Comando creado por: Josue23#2852
    } else

    if(message.content.startsWith(prefix + "daimanatetas")) {

        if(!message.channel.nsfw)
        return message.channel.send(":underage: | **"+message.author.username+"** Solo puedes usar este comando en un canal **NFSW**.")

          var daimana = [
        "https://cdn.boob.bot/boobs/80015DF5.gif",
        "https://cdn.discordapp.com/attachments/691179999134351380/735692252294152273/EdDtbZcUEAAqkj9.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735692443118469160/EdDtbZZVAAELglx.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735692680868397076/EdFYgKwXYAMrnDD.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735692981201403919/EcsDzW3UMAEbNhq.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735696095958532096/IMG_20200627_214511_215.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735696331796119584/EbtEGXrXsAE48yh.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735696487933149284/EbtRzSiX0A0nMBW.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735696650290593924/EcWeqWsWsAM8Bnb.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735697817846153236/IMG_20200511_212420.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735698062382727201/IMG_20200514_164207.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735698209254539365/IMG_20200515_163414.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735698421603762296/IMG_20200515_140006.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735699203434610758/Ea6iiXpWoAE54EB.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735699575821566003/IMG_20180531_190326.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735701121250885672/EdZm7GPXgAAXQtu.png",
        "https://cdn.discordapp.com/attachments/691179999134351380/735701309747101877/EddjReBWkAEIgKo.png",
        "https://es.pornhub.com/gif/5224311",
        "https://es.pornhub.com/gif/2036451",
        "https://es.pornhub.com/gif/1770881",
        "https://es.pornhub.com/gif/25674031",
        "https://es.pornhub.com/gif/3533601",
        "https://es.pornhub.com/gif/15952792",
        "https://es.pornhub.com/gif/9646582",
        "https://es.pornhub.com/gif/2680561",
      ]

          let tits = daimana[Math.floor(maira.length * Math.random())];

          let underage = new Discord.MessageEmbed()
          underage.setImage(tits)
          underage.setColor("RANDOM")
          message.channel.send(underage);
    } else

    if(message.content.startsWith(prefix + "maricheceltics")) {

      var futbolmc = [
        "https://cdn.discordapp.com/attachments/691179999134351380/748279149877002280/marichecelctics.png",
        "https://media.discordapp.net/attachments/640286744813502486/714653865370451998/PicsArt_05-02-02.20.23.jpg?width=693&height=474"
        ]

        const maricheclubfc = futbolmc[Math.floor(futbolmc.length * Math.random())];

        let fcmariche = new Discord.MessageEmbed()
        fcmariche.setImage(maricheclubfc)
        fcmariche.setColor("RANDOM");
      message.channel.send(fcmariche);
    } else

    if(message.content.startsWith(prefix + "gdfont")) { //Este comando no necesita un npm
  
      if(!args[0]) return message.channel.send(":x: | Necesitas escribir un argumento.") 
    
        let texto = args.join('%20'); //Este es el espacio de texto, es recomandable dejarlo en 20% para que sea compatible con la API
  
        let attachment = new Discord.MessageAttachment(`https://gdcolon.com/tools/gdlogo/img/${texto}`, 'logo.png') //Aqui se crea la imagen
  
      message.channel.startTyping(); //Aparece que el bot esta escribiendo
        
      setTimeout(() => {
        message.channel.stopTyping()
        }, 3000); //Para de escribir a los 3s
  
      message.channel.send(attachment)
    } else
        
    if(message.content.startsWith(prefix + "hack")) {
  
      let dominios = ["outlook.com", "gmail.com", "hotmail.com", "yahoo.com", "live.com", "yandex.com"] //Se pueden cambiar a mas direcciones de correo
  
      let userhack = message.mentions.users.first()
  
        var correos = dominios[Math.floor(Math.random() * dominios.length)];
  
        if(!userhack){
          message.delete({ timeout: 5000 })
          message.channel.send(":spy: | **" + message.author.username + "** No te puedes autohackear.").then( m => {
          m.delete({ timeout: 5000 }) //Mensaje y mensaje del autor se eliminan a los 5s
          });
          return;
        }
  
        var gifhack = [
          "https://media.giphy.com/media/8WeatsYCC54TC/giphy.gif",
          "https://media.giphy.com/media/lp3GUtG2waC88/giphy.gif",
          "https://media.giphy.com/media/AeHLxU7TZXCPS/giphy.gif",
          "https://media.giphy.com/media/LcfBYS8BKhCvK/giphy.gif",
          "https://media.giphy.com/media/l0HlvFUHvDB16UOwU/giphy.gif",
          "https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif",
          "https://media.giphy.com/media/3oriNLx3dUqFgVi86I/giphy.gif",
          "https://media.giphy.com/media/oVvhEYvWDvE1G/giphy.gif",
          "https://media.giphy.com/media/fdOA43sHFE6Pu/giphy.gif",
          "https://media.giphy.com/media/hun4DFmfnDId3lid5b/giphy.gif",
          "https://media.giphy.com/media/UqxVRm1IaaIGk/giphy.gif",
          "https://media.giphy.com/media/Q61LJj43H48z1FIK4X/giphy.gif",
          "https://media.giphy.com/media/wSSooF0fJM97W/giphy.gif"
        ]
  
        const hacking = gifhack[Math.floor(gifhack.length * Math.random())];
  
        let ip = chance.ip();
        let correo = chance.email({ domain: correos });
        let contraseña = chance.word({ length: 10 }); //Longitud de contraseña
        let genero = chance.gender()
  
        let hacked = new Discord.MessageEmbed()
        hacked.setTitle("**"+message.author.username+"** ha hackeado a **"+ userhack.username+"** :spy:")
        hacked.setDescription("IP: `"+ ip +"`\nCorreo: `"+ correo +"`\nContraseña: `"+ contraseña +"`\nGénero: `"+ genero + "`")
        hacked.setImage(hacking)
        hacked.setColor("RANDOM");
        message.channel.send(hacked);
      } else

      if(message.content.startsWith(prefix + "mccs")) {
        message.channel.send("**" + message.author.username + "**, revisa tus mensajes privados :metro: :white_check_mark:");

        let caracas = new Discord.MessageEmbed()
        .setAuthor("Mapa del Metro de Caracas", client.user.displayAvatarURL())
        .setDescription("Ya esta de nuevo publicado el mapa del Metro de Caracas (Tramo Propatria - Chacaíto), si desean descargarlo les dejo el siguiente enlace. También dentro de poco estaré publicando la Línea 2 (Zoológico/Las Adjuntas - La Paz) si quieren saber estén muy atentos a todas mis redes sociales :metro:")
        .setThumbnail("https://media.discordapp.net/attachments/691179999134351380/728829724796649533/1200px-Metro_de_Caracas_Venezuela_logo.svg.png")
        .addField("Enlace de descarga", "[Belytra](https://belytra.com/mapa-metro-de-caracas-2/)")
        .addField("Redes sociales", "[Facebook](https://www.facebook.com/Atomimox05)\n[Twitter](https://www.twitter.com/Atomimox_)\n[Youtube](https://www.youtube.com/c/Atomimox05)\n[Patreon](https://www.patreon.com/atomimox05)", true)
        .addField("Puedes donar aquí", "[Gracias mano tkm](https://paypal.me/atomimox05)", true)
        .setColor("RANDOM")
        .setImage("https://media.discordapp.net/attachments/691179999134351380/764702816417349672/mcssbanner1-2.png?width=576&height=360")
        .setTimestamp()
        .setFooter("Este mapa sólo está disponible para Minecraft Bedrock Edition, para Java no se tiene pensado hacerlo.");
        message.member.send(caracas);
      } else

      //Comandos de texto largo

    if(message.content.startsWith(prefix + "sanciones")) {
 
      const sanciones = new Discord.MessageEmbed()
      .setAuthor("Sanciones para los miembros del server", client.user.displayAvatarURL())
      .setDescription("Regla 1: warn\nRegla 2: warn\nRegla 3: warn o ban (según el caso)\nRegla 4: Ya esta aclarado en información.\nRegla 5: :arrow_up:\nRegla 6: :arrow_up:\nRegla 7: warn, expulsión (3 warns)\nRegla 8: mute 1h, mute 2h, expulsión\n\n3 warns = mute 20m\n\nAntes de hacer un warn por cualquier regla se hace un llamado de atención, si el miembro lo ignora o le hace caso omiso se le da el warn. Si la persona sigue violando una norma despúes del mute de los 3 warns se le aplicara mute de 1h y si sigue se le aplica **BAN** de 3 dias.")
      .addField("Otras sanciones", "el que use `@everyone` con un comando, lleva warn y mute de una hora.\n\nEn casos de raid se usará el `>>raidmode`.")
      .addField("Recordatorio", "- El Uranio y los niveles 100 tienen una reducción de sanciones de un 30% y Plutonio un 50%, exepto a los miembros que estén en la blacklist.\n\n- El Antimateria y el Robotic se salvan de los warns y se les reducen los tiempos de sanción en un 90%\n\n- El pedir dinero pra el bot de economía frecuentemente lleva a un warn.\n\nCita de Omar: `Aja cuerdas de vírgenes, dejen de banear a las personas que escriben en el chat general sin razon alguna, la idea de estar en discord es tener gente que hable sin que tenga rango no los mismos 5 maricos con moderador. No baneen a la gente sin causa alguna son maricos o que?, La idea de esta mierda es tener gente y crear mas canales les hare mente, Abraham es otaku aja equis imaginen que trae otros otakus o papulinces homosexuales, se le crea un canal aparte para no leer sus mierdas, eso seria mas actividad dejen de banear sin razón y usen el maldito cerebro csm`.", true)
      .setColor("RANDOM")
      .setFooter("Se recomienda el uso del Vortex.")
      .setThumbnail("https://media.discordapp.net/attachments/691179999134351380/715780043313512468/azmIEtYiZKWx8DUAMFrUILgaT1pJuwH3PMAxNxf8wJCGednG9pWGEsNeUfTJwakl3jqx7ywcJNTKJyWo3BGLbpZIYf4p9PXrOVc.png?width=142&height=184");
      message.channel.send(sanciones);
    } else

    if(message.content.startsWith(prefix + "historia")) {

      if(cooldown.has(message.author.id)){
        message.channel.send(":no_entry: | Espera 10 segundos para volver a usar el comando.");
        return;  //Cooldown de 10s para volver a usar el comando
      }
  
      cooldown.add(message.author.id);
         
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 10000);
  
      const history = new Discord.MessageEmbed()
      .setTitle("Historia del servidor :notebook_with_decorative_cover:")
      .setDescription("Creado por Donomar, anteriormente llamado Venecoland, pero fue raideado por Galahad y SadCat.\n\nPersonajes influyentes:\n\n**Omar:** Dueño y dictador de esta verga antes hacia memes 24/7 pero ya no hace eso mano, que chimbo, ahora es puro jugar amoung us y terraria. También baneaba al que medio se moviese sapegato. Ahora le vendio Veneco Posting a chui nojoda.\n\n**Atomimox:** Hizo todo lo que tu vez en esta verga, el pana es senda lacra y ayuda a todo el mundo\n\n**xSmau:** nojoda es un de los mejores Mod's del server, una lacra. xSmau the best ever\n\n**Daimana:** una de las pocas chamas del sever, una vez se pico porque nadie la queria de mod y se fue, pero volvio odiosa y no habla con nadie :pensive:\n\n**Offline:** era el pure del server, Se salio xq ya no se le hacia interesante el server y no tiene nada que hacer. Fue el mejor campeón de xSmau y se cojia los tubos de escape de los carr0s.\n\n**Elmo:** o tambien conocido como masturbador cronico, el menor no puede medio ver una nalga o un pixel de teta porque el webo lo tiene mas parao que carro en cola e gasolina.\n\n**Keiiver:** el peruano del grupo, antes regalaba netflix a todo el mundo pero ahora se puso inactivo.\n\n**Yukatan:** coño se este tipo no hay mucho que decir, es urde convive pero se la pasa besandose con fango.\n\n**Kartoon:** otro pure mas, el mnr a veces tiene la razon cuando habla pero se la pasa es puro jugando, odia ser mod\n\n**Oruga:** otro maracucho mas njd, puro violin aqui XD, el tipo es serio en la mamawevada pero tambien tiene peos con el internet csm.\n\n**Fango:** el esclavo del grupo, aveces se escapa de la jaula pero si no le paras bolas no te hace nada.\n\n**Penka:** un veterano de guerra, el convive lleva mas tiempo aqui que el propio server XD, pana serio.")
      .setColor("CC3333");
      message.channel.send(history);
  
      const historia = new Discord.MessageEmbed()
      .setDescription("**Gato:** Pana super convive, el era antes pinga e activo pero se envisio al samp y ahora ni se conecta njd.\n\n**Luih:** Un pana gafo y urde pegaO, el pana fue gobernador pero se salio por una mariquera del server y perdio todo, no le gusta que umi mame webo.\n\n**Luis:** coño es pana era activo 24/7 y top 1 del server pero ahora es relajao.\n\n**Umi:** la otaku de barinas, super pana y admin del grupo e whatsapp, puro pendiente del pipe del novio apue, jeva de medio server ahora.\n\n**Alvaro:** era pana antes pero agarro toxicidad, se puso urde mrc y piro, odia a omar.\n\n**Hitler con tetas:** esta es mas otakus que todos ike puro hentai pene y vainas raras\n\n**J_King:** el pana pocetiao o el duende del server, a veces sale de su cueva pa jugar samp con gato pero si no aparece por un tiempo es que se lo trago la poceta :scream:\n\n**Astroberto:** o mejor como astrowebo el cuando llego era un tipo que hacia reir y era serio, luego desaparecio por 3 meses poruqe le robaron la canaima por awebonaio XDDD pero volvio toxico e insultando a todos, esta baneado permanente.\n\n**Abraham:** un otaku maracucho, echale bolas, este manin hace memes y videos calida, pero tiene pinga e peos con el interne.\n\n**Virus:** el pana llego de la nada y se gano su plutonio que beta, es la esposa de nefario y se dan pipe todos los dias.\n\n**Elie:** es el admin de unusual, bendecido por el pana miguel, pendiente de una arrecostadera con keive.\n\n**Khelder:** coño mano welve :sob:, el pana gano las primeras elecciones pero un dia antes murio y nadie supo mas nada de el :sob:\n\n**Roxana:** otra veterana de guerra, nunca se conecta pero ahi esta con los zamuros encima csm #Roxanawelve :pensive:\n\n**Giobanny:** coño este pana a veces se pone hiper ladilla y y le dan picasones de culo, la mayoria lo odia. El truco esta en no pararle bolas.")
      .setColor("RANDOM");
      message.channel.send(historia);
  
      const historia1 = new Discord.MessageEmbed()
      .setDescription("**CrackBull:** lo llaman el toro el mas pato del server junto a Daniel, lo banearon de discord por raidear un server partner que webOn XDDDDDD, es burda de pana.\n\n**Ian**: todo el mundo sabe que es otaku aunque no lo admita (coño juegas osu y te pones a una caraja de anime de perfil evidentemente eres otaku broder), se la pasa hablando de su canaima geimer siempre nojoda que webo tan peluo, se pica rapido.\n\n**Wedes**: uno de los miembros mas resaltantes, y te preguntaras porque, bueno, a parte de ser negro y sometido, vive en el último barrio de las Adjuntas XDDD, a veces se pone a gritar y no deja dormir a uno, pero si le pides un favor el de buena gente lo hace.\n\n**Quesadiya:** el pana es convive pero aveces no se le entiende nada xd.\n\n**Monstarj0u:** sendo e pana de xsmau, masturbador de perros profesional y hace unas tortas de auyama criminales oyo, un veterano recio con un machete de 8 metros.\n\n**Ezequiel:** El bicho más marisco del server, puro Kike mete flores en el qlo, una vez concurso para ser mod y le ganó daimana culo awado.donde entonce lucha por ser mod.\n\n**Maira:** ike lleva ike desde febrero pero no hablaba (senda excusa), ike la lesbiana del server (mentira), la leyenda dice que si le dices lesbiana te responde keiiver mamalo.\n\n**Ron:** Lo LLaman *Gaf0*,c0nvive, obsesionao con FNaf queriendose coge un poyo animatronico komoejeso var0n, sape gato, urde ladiya tmb.\n\n**Daniel:** es el pana mas, pero mas aweboniao del servidor, se sale a cada rato del server y no se da cuenta XDDDDDD, la otra vez banio a gato pensando que era SadCat XDDDDDD #Danielaweboniao.\n\n**Victor:** Tambien conocido como *El pawel ranyer* (le mete a lo que sea) este mmgvo es de los más activos del servidor, llego de la nada absoluta y se hizo Mod. Increible. Es burde pana, jevo e richa y gerardo lo acosa sexualmente XD.")
      .setFooter("Pedido por " + message.author.username)
      .setColor("RANDOM");
      message.channel.send(historia1);
      } else

      //Embeds usados en la información y reglas

  if(message.content.startsWith(prefix + "2003maricherules2003")) {
  
    var server = message.guild;
  
      const ImageMReglas = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage("https://media.discordapp.net/attachments/691179999134351380/761762303166119977/reglasmariche.png?width=510&height=141");
      message.channel.send(ImageMReglas);//Imagen Reglas
  
      const InfoMReglas = new Discord.MessageEmbed()
      .setTitle("¡Bienvenidos a Mariche Country Club! :flag_ve::fire:")
      .setDescription("Recuerda leer detenidamente las reglas para evitar futuros incovenientes en el server. El equipo de Staff esta comprometido en hacer cumplir todas las reglas. Cualquier duda o sugerencia acerca del servidor, la puedes dejar en el canal de <#640311057855938643>");
      message.channel.send(InfoMReglas);//Info Reglas
  
      const Warn = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail("https://media.discordapp.net/attachments/691179999134351380/715706259160170516/unnamedg.png?width=461&height=461")
      .setTitle("AVISO")
      .setDescription("Estas reglas están sujetas a los **Terminos de Servicio de Discord.**\nSi deseas reportar a un usuario directamente a Discord por violar estas normas, [Usa este enlace.](https://dis.gd/request)");
      message.channel.send(Warn);
  
      const EmbedMReglas = new Discord.MessageEmbed()
      .setTitle("Reglas Generales del Servidor :notebook_with_decorative_cover:")
      .setDescription("`[1]` :handshake: **Respetar a todos y cada uno de los miembros de este servidor**. No debes ser partícipe de actos de acoso, cyber-bullying, discriminación, difamación, etc.\n`[2]` :paperclips: **Utilizar los canales como debido**. Por ejemplo, usar los comandos en <#640301597154345000>.\n`[3]` :no_entry: **No hacer ningun tipo de spam** (flood, emotes, links y/o palabras repetidas), en los canales principales, a menos que sea en el canal de <#640307026588598282> , dicho canal es unica y exclusivamente para ello. Igualmente esta prohibido spamear servidores por MD. Esto conlleva a un *BAN PERMANENTE*\n`[4]` :outbox_tray: **No pedir e insistir en obtener un rol** (incluido el mod), este se te otorgará cuando sea su debido momento. Si sigues insistiendo en un rol, por sanción de te otorgara <@&665986990738767883> o <@&691679197067870280> indefinidamente.\n`[5]` :underage: **Está totalmente prohibido enviar contenido explícito (pornográfico, erótico, gore, sugestivo, etc.),fuera de los canales NSFW**, tal incumplimiento generará inmediata expulsión del server.\n`[6]` :anger_right: **Evitar nombres imposibles de mencionar**, ya que esto causa molestias o confusiones a la hora de hacer una mención. El equipo de <@&640316061849354251> tiene la obligación de cambiar el apodo de un miembro a uno mas fácil de mencionar.\n`[7]` :spy: **Prohibido suplantar, robar o copiar la identidad de una persona**, ya esto genera inconvenientes y molestias a las demás personas. Respeta la privacidad de los demás.\n`[8]` :frame_photo: También esta **prohibido reenviar imagenes de un miembro de este server** como persona sin su consentimiento, tampoco con un edit o un meme.");
      message.channel.send(EmbedMReglas);
  
      const EmbedReglasMFinal = new Discord.MessageEmbed()
      .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
      .setDescription("¿Quieres saber mas sobre el server? Ve al canal de <#676571025722572845>");
      message.channel.send(EmbedReglasMFinal);//Reglas Parte Finals
  
      const EmbedMNo = new Discord.MessageEmbed()
      .setFooter(server.name, server.iconURL())
      .setColor("RANDOM");
      message.channel.send(EmbedMNo);//Pie de pagina
  
      message.delete({ timeout: 2000 })
  } else
  
  if(message.content.startsWith(prefix + "2002maricheinfo2002")) {
  
    var server = message.guild;
  
      const ImgMInfo = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/691179999134351380/761762216902000691/informacion.png?width=510&height=141")
      .setColor("RANDOM");
      message.channel.send(ImgMInfo);
    
      const InfoMIntr = new Discord.MessageEmbed()
      .setTitle("¡Bienvenido al canal de Información! :moyai::fire:")
      .setDescription("En este canal podrás encontrar toda la información referente al server (canales, roles, eventos, bots, etc.), si no logras entender alguna cosa comunicate con el <@&640316061849354251>.");
      message.channel.send(InfoMIntr);
    
      const ImgMRoles = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/691179999134351380/761762303339003944/roles.png?width=510&height=141")
      .setColor("RANDOM");
      message.channel.send(ImgMRoles);
    
      const InfoMRoles1 = new Discord.MessageEmbed()
      .setTitle("Roles de Staff :oncoming_police_car:")
      .setDescription("A continuación, se describirán todos los roles del equipo de <@&640316061849354251>.\n\n`◈` <@&640287105309868054> → Este rol es exclusivo para los creadores y dueños del servidor.\n`◈` <@&711274669038370847> → Este rol es para los administradores del servidor, quienes se encargan del mantenimiento y del buen funcionamiento de este.\n`◈` <@&651203749892718625> → Este rol es para los moderadores, estos se encargan de ayudar y mantener en todo el servidor.");
      message.channel.send(InfoMRoles1);
  
      const InfoMRoles2 = new Discord.MessageEmbed()
      .setTitle("Roles XP :up:")
      .setDescription("Estos roles se obtienen hablando en los canales de texto.\n\n`◈` <@&691085361023025182> → Ningún permiso a destacar. Este se obtiene al verificarse en el servidor.\n`◈` <@&691084134457540679> → Eres **nivel 5**, desbloqueas los autoroles.\n`◈` <@&691084134235504641> → Eres **nivel 10**, puedes cambiarte el apodo.\n`◈` <@&691085490656641065> → Eres **nivel 20**, puedes enviar imágenes en <#640286744813502486>.\n`◈` <@&691085160854192158> → Eres **nivel 30**, puedes crear invitaciones propias.\n`◈` <@&702981926528745532> → Eres **nivel 40**, puedes añadir reacciones y enviar reacciones externas.\n`◈` <@&691085027525787670> → Eres **nivel 50**, puedes empezar a hacer directos dentro del servidor.\n`◈` <@&703069382695190639> → Eres **nivel 60**, ya estas cerca de ser miembro VIP, puedes enviar links en los canales principales de texto.\n`◈` <@&691085024241647678> → ¡Bienvenido a las grandes ligas!. Eres **nivel 70**, se te da acceso al canal <#665969275122614303>.\n`◈` <@&702982217974153239> → Eres **nivel 80**, se te da prioridad de palabra en los caneles de voz.\n`◈` <@&691085484646072372> → Eres **nivel 90**, se te reducen el tiempo de las sanciones en un 50% y eres reconocido como un verdadero veterano dentro del servidor.\n\nAl llegar al **nivel 100** podrás crear tu propio rol personalizado y también llegarás a ser parte del <@&640316061849354251> indirectamente, además se te reducen el tiempo de las sanciones un 30%.\n\nPuedes ver tu ranking en el servidor usando `a!rank`\n\n**NOTA:** - Si llevas un mes fuera del servidor, tu XP será RESETEADA.\n - Si llevas al menos 3 meses inactivo se te expulsará del servidor\n - Si entras al servidor y llevas al menos 2 semanas sin ser verificado, se te expulsará del servidor.");
      message.channel.send(InfoMRoles2);
  
      const InfoMRoles3 = new Discord.MessageEmbed()
      .setTitle("Roles económicos :game_die:")
      .setDescription("Estos roles son similires a los de XP, pero con la pequeña diferencia de que estos se consiguen mediante los sorteos y aumenta su exclusividad.\n`◈` <@&653371116043239487> → Puedes cambiarte el apodo y desbloqueas los autoroles.\n`◈` <@&653371687404044304> → Puedes crear invitaciones.\n`◈` <@&653375753496297549> → Ya puedes enviar imagenes en <#640286744813502486>.\n`◈` <@&653375554761785365> → Puedes añadir reacciones y enviar emotes externos.\n`◈` <@&679403058773360652> → Puedes empezar a hacer directos dentro del servidor.\n`◈` <@&702982895689531572> → Puedes enviar links en los canales principales.\n`◈` <@&653377012827684887> → Desbloqueas el canal <#665969275122614303>.\n`◈` <@&702982936210833440> → Empiezas a tener prioridad de palabra en los canales de voz.\n`◈` <@&653377802514726931> → Puedes cambiar la música a tu gusto en <#640301046224388106> y se te reducen los tiempos de sanción en un 30%.\n`◈` <@&653378505324625960> → Se te reducen los tiempos de sanción en un 50% y los warns para ti ya no existen.\n`◈` <@&702983443537068123> → Rol desconocido, la leyenda dice que te pueden dar permisos cercanos a los de un mod.\n\nPuedes ver el precio de cada uno de estos roles usando `.shop` y `.shop 2` en <#640301597154345000>.\n\n- Se recomienda que cuando ganes un rol tomes captura de pantalla por prevención.");
      message.channel.send(InfoMRoles3);
  
      const InfoMRoles4 = new Discord.MessageEmbed()
      .setTitle("Roles Exclusivos :star:")
      .setDescription("Estos roles solo los pueden obtener ciertos miembros, quizá algun día obtengas alguno.\n\n`◈` <@&698593591181705328> → Este rol es asignado para los miembros que mejoren el server con Discord Nitro. Se les desbloquea todos los permisos VIP. Y además pueden subir de nivel un 10% más rápido.\n`◈` <@&728763703306092676> → Solo es entregado a los miembros que aporten para que **MaricheBot** sigua en linea. Usa `;;donar` para más información.\n`◈` <@&687699715420454942> → Este rol solo es entregado a los moderadores y administradores del grupo de Facebook, son inmunes a los bots y pueden ver todos los canales privados.\n`◈` <@&671519007362252915> → Este rol es entregado a los miembros que tengan un servidor aliado a este, se les concede enviar enlaces e imágenes en todos los canales genrales y se les desbloquea el canal <#665969275122614303>.\n`◈` <@&691086950995722280> → Este rol se obtiene al participar y ganar en concursos y eventos del server.\n`◈` <@&704491602554519632> → Exclusivo únicamente para los miembros que entraron al server antes del 2020.\n`◈` <@&716070008001921154> → Exclusivo para los admins de nuestro server aliado oficial **Unusual Things**:rainbow:.\n`◈` <@&693926996996128788> → Se les otroga a los miembros activos en el grupo de facebook que comparten sus memes calidad y a los que posean una canal en YouTube con más de 500 suscriptores. Se les da permiso de enviar archivos a todos los canales.");
      message.channel.send(InfoMRoles4);
  
      const ImgMCag = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/691179999134351380/761761964463882260/categorias.png?width=510&height=141")
      .setColor("RANDOM");
      message.channel.send(ImgMCag);
  
      const InfoMCatg = new Discord.MessageEmbed()
      .setTitle("Categorias del servidor :books:")
      .setDescription("`◈` **#»-Importante:** Como lo dice su nombre, debes leer las reglas y la información que se te dan para que tengas una buena estadía en el server. :stop:\n`◈` **#»-Lobby:** En esta categoría se encuentran los colores, sorteos y mucho más. :book:\n`◈` **#»-Chats:** Es aquí donde pertenecen los canales principales de texto. :link:\n`◈` **#»-Bots:** Aqui estan todos los canales dedicados a los bots y los canales NSFW. :robot: :underage:\n`◈` **#»-Canales de voz:** En esta categoria estan todos los canales de voz, algunos estan adaptados para solo escuchar y otros para transmitir en directo. :loud_sound:\n`◈` **#»-Miraflores:** Aquí se reune el equipo de <@&640316061849354251> para decidir el futuro del server. :night_with_stars:");
      message.channel.send(InfoMCatg);
  
      const ImgMExtra = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/691179999134351380/761762057170845726/extras.png?width=510&height=141")
      .setColor("RANDOM");
      message.channel.send(ImgMExtra);
  
      const FaceMariche = new Discord.MessageEmbed()
      .setTitle("Grupo oficial de Facebook :boom:")
      .setDescription("https://www.facebook.com/groups/214510926310461/, si quieres ver las demás páginas oficiales del grupo, usa `;;social`")
      .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
      .setColor("RANDOM");
      message.channel.send(FaceMariche);
  
      const Sugerencias = new Discord.MessageEmbed()
      .setDescription(":spiral_note_pad: Si quieres enviar una sugerencia para mejorar el servidor, usa `ch!suggest` en <#640301597154345000>, después esta aparecerá en <#640311057855938643>\n\n:spy: Igualmente, si te quieres confesar usa `ch!confession` en el mismo canal de <#640301597154345000> y la confesión aparecerá en <#676153908237828180>. (La confesión es totalmente anónima)\n\n:warning: Si deseas reportar un usuario por su comportamiento indebido usa: `ch!report` y este será enviado al canal de asamblea inmediatamente.");
      message.channel.send(Sugerencias);
  
      const InfoMExtra4 = new Discord.MessageEmbed()
      .setDescription(":crossed_swords: Si quieres hacer una alianza con nuestro servidor, debes comunicarte con <@&640287105309868054> para que acepten y formalizen la alianza.");
      message.channel.send(InfoMExtra4);
  
      const InfoInvM = new Discord.MessageEmbed()
      .setTitle("Link de invitación permanente del servidor :label:")
      .setDescription("https://discord.gg/ZrnyTGG")
      .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
      .setColor("RANDOM");
      message.channel.send(InfoInvM);
  
      const ImgGMracias = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/691179999134351380/761762145448362004/garcias.png?width=510&height=141")
      .setColor("RANDOM");
      message.channel.send(ImgGMracias);
  
      const GraciasMLeer = new Discord.MessageEmbed()
      .setTitle("¡Muchas Gracias por leer! :tada:")
      .setImage("https://cdn.discordapp.com/attachments/674086778155696138/731362897774641273/gif.gif")
      .setDescription("El servidor se irá actualizando dependiendo de las   sugerencias y quejas que se reciban. El canal de <#640311057855938643> está habilitado para ello.");
      message.channel.send(GraciasMLeer);
  
      const EmbedSiM = new Discord.MessageEmbed()
      .setFooter(server.name, server.iconURL())
      .setColor("RANDOM");
      message.channel.send(EmbedSiM);
  
      message.delete({ timeout: 2000 })
      } //Pipe pa Yobani
});

client.login(config.token).catch(e => console.log(e)); //Token del bot, enlace a config.json