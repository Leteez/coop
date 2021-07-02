<template>
	<body>
		<Header/>
		<div id="form">
			<h4 id="topic">{{conversation.topic}}</h4>
			<h6 id="label">{{conversation.label}}</h6>
			<div id="conversation">
				<template v-for="message in messages">
					<div>
						<Message :message="message"></Message>
					</div>
				</template>
			</div>
			<div id="box">
				<form @submit.prevent="postMessage()">
						<input v-model="message" required type="text" placeholder="Message" id="texte">
						<button id="send">Envoyer</button>
				</form>
			</div>
		</div>
	</body>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Message from '@/components/Message.vue'
	export default{
		components:{
			Header,
			Message
		},
		data(){
			return{
				conversation: false,
				message: null,
				messages: [],
			}
		},
		mounted(){
			if(this.$route.params.id){
				api.get('channels/'+this.$route.params.id).then(response=>{
					this.conversation = response.data;
					this.chargeMessages();
					this.$bus.$on('charge-messages',this.chargeMessages);
				})
			}
		},
		methods:{
			chargeMessages(){
				api.get('channels/' +this.conversation.id+ '/posts').then(response=>{
					this.messages = response.data.reverse();
				})
			},
			postMessage(){
				api.post('channels/'+this.conversation.id+'/posts',{ message : this.message }).then(response=>{
					setTimeout(()=>{
						this.$refs["bottom"].scrollIntoView();
					}, 500);
					this.chargeMessages();
					this.message = "";
				})
			},
			deleteMessage(){
				if(confirm('Suppression ?')){
					api.delete(`channels/${this.message.channel_id}/posts/${this.message.id}`).then(response=>{
						this.message = false;
					});
				}
			}
		}
	}
</script>

<style>
#form { text-align: center; }
#label { margin-left: 3.5em; }
button { margin :  1em; }
#box { margin-top: 1em; }

#conversation {
	border: 0.051em solid #232f3e;
	border-radius: 10px;
	margin-left: 10em;
	margin-right: 10em;
}

#texte {
	width: 45em;
	border: 0.1em solid #232f3e;
}

#topic {
	margin-left: 2.5em;
	color: #e38a17;;
}

#send {
	border: #232f3e;
	background-color: #232f3e;
	color: #FFFFFF;
}

#send:hover {
	background-color: #e38a17;
	color: #232f3e;
}
</style>
