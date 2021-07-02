 <template>
 	<div class="message">
 		<div class="entete">
      <div id="contact">
 		    <img class="avatar" :src="avatar"/>
        <span id="name">{{member.fullname}}</span>
        <span id="date"> - {{dateMessage}}</span>
      </div>
      <div id="button">
        <button class="button" @click="deleteMessage" id="delete">Supprimer</button>
      </div>
      <div class="conversation" v-if="message.conversation">
        <div id="titre">
   			  <span id="titreSpan">dans {{message.conversation.topic}}</span>
        </div>
   		</div>
 		</div>
 		<span id="message">{{message.message}}</span>
 	</div>
 </template>

 <script>
 	export default{
 		props: ['message'],
 		computed:{
 			avatar(){
 				return ("https://gravatar.com/avatar/" +md5(this.member.email)+ "?s=400&d=identicon&r=pg");
 			},
 			member(){
 				return this.$store.getters.getMember(this.message.member_id);
 			},
 			dateMessage(){
 				let options = {weekday : 'long', year : 'numeric' , month: 'long', day: 'numeric'};
 				return new Date(this.message.created_at).toLocaleDateString('fr-FR', options);
 			},
 		},
 		methods:{
 			deleteMessage(){
 				if(confirm('Suppression ?')){
 					api.delete(`channels/${this.message.channel_id}/posts/${this.message.id}`).then(response=>{
 						  this.$bus.$emit('charge-messages');
 					});
 				}
 			},
 		}
 	}
 </script>

<style>
#contact { float: left; }
#button { float: right; }
#name { font-size: 0.8em; }
#date { font-size: 0.5em; }
#message { font-size: 0.8em; }
#titreSpan { margin-left: 0.3em; }

#titre {
  font-size: 0.5em;
  padding-top: 1.1em;
}

img {
  width: 1.1em;
  margin-right: 0.5em;
}

.message {
 	margin-top: 1em;
  margin-bottom: 1em;
 	margin-left: 1em;
  color: black;
}
</style>
