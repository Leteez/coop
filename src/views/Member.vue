<template>
	<body>
		<Header/>
		<div class="member">
		</div>
		<div v-if="member">
			<h2>{{member.fullname}}</h2>
			<div id="info">
				<div>{{member.email}}</div>
				<div>Inscrit le {{member.created_at}}</div>
			</div>
			<div v-if="loading">
				Chargement...
			</div>
			<div v-else class="messages">
				<template v-for="message in sortedMessages">
					<div id="block">
						<Message :message="message"></Message>
					</div>
				</template>
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
				member: false,
				messages : [],
				loading : true
			};
		},
		computed:{
			sortedMessages(){
				function compare(a, b ){
					if(a.created_at < b.created_at){
						return 1;
					}
					if(a.created_at > b.created_at){
						return -1;
					}
					return 0;
				}
				return this.messages.sort(compare).slice(0,10);
			}
		},
		mounted(){
			if(this.$route.params.member_id){
				this.member = this.$store.getters.getMember(this.$route.params.member_id);
				let options = {weekday : 'long', year : 'numeric' , month: 'long', day: 'numeric'};
				this.member.created_at = new Date(this.member.created_at).toLocaleDateString('fr-FR', options);
				let compte = 0;
				this.$store.state.conversations.forEach(conversation=>{
					api.get('channels/' +conversation.id+ '/posts').then(response=>{
						response.data.forEach(message=>{
							if(message.member_id == this.member.id){
								message.conversation = conversation;
								this.messages.push(message);
							}
						})
						compte++;
						if(this.$store.state.conversations.length == compte){
							this.loading=false;
						}
					});
				})
			}
		}
	}
</script>

<style>
#block {
border: 0.1em solid #232f3e;
border-radius: 10px;
margin-left: 1em;
padding-top: 1em;
width: 97%;
margin-bottom: 1em;
}

#info {
	text-align: center;
	padding-bottom: 1em;
	color: #232f3e;
	fint-size: .5em;
}
</style>
