<template>
	<div class="row" id="row">
		<div class="column column-75">
			<h4 id="topic">{{conversation.topic}}</h4>
			<h6 id="label">{{conversation.label}}</h6>
		</div>
		<div class="column column-25 actions" id="button">
			<router-link :to="{name:'Conversation',params:{id : conversation.id}}" class="button" id="open">ouvrir</router-link>
			<button class="button button-outline" @click="deleteConversation" id="delete">supprimer</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['conversation'],
		methods:{
			deleteConversation(){
				if(confirm('Suppression ' +this.conversation.topic+ ' ?')) {
					api.delete('channels/'+this.conversation.id).then(response=>{
						this.$bus.$emit('charge-conversations');
					}).catch(error=>{
						console.log(error.response.data);
					});
				}
			}
		}
	}
</script>

<style>
#button { text-align: right; }
#open, #delete { margin: 1em; }

#row {
	border: 0.1em solid #232f3e;
	border-radius: 10px;
	margin-left: 1em;
	padding-top: 1em;
	width: 97%;
	margin-bottom: 1em;
}

#label {
	margin-left: 0.75em;
}

#topic {
	margin-left: 0.5em;
	color: #e38a17;
}

#open {
	background-color: #232f3e;
	border: #232f3e;
}

#open:hover {
	background-color: #e38a17;
	color: #232f3e;
}

#delete {
	border: #232f3e;
	background-color: #232f3e;
	color: #FFFFFF;
}

#delete:hover {
	background-color: #e38a17;
	color: #232f3e;
}
</style>
