<template>
	<div class="row">
		<div class="column column-75">
			<h4 id="identite">{{member.fullname}}</h4>
			<h6 id="mail"><a :href="'mailto:'+member.email">{{member.email}}</a></h6>
		</div>
		<div class="column" id="button">
			<router-link :to="{name:'Member', params: {member_id:member.id}}" class="button" id="profil">Profil</router-link>
			<span v-if="connectedMember"></span>
			<span v-else><button class="button" @click="deleteMember" id="delete">Supprimer</button></span>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['member'],
		computed:{
			connectedMember(){
				return this.$store.state.member.id == this.member.id;
			}
		},
		methods:{
			deleteMember(){
				if(confirm('Suppression ' +this.member.fullname+ ' ?')){
					api.delete('members/'+this.member.id).then(response=>{
						this.$bus.$emit('charge-members');
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
#delete, #profil { margin: 1em; }
#mail a:hover { color: #e38a17; }

#identite {
	margin-left: 0.75em;
	color: #e38a17;
}

#mail a {
	margin-left: 1em;
	color: #232f3e;
}

#profil {
	background-color: #232f3e;
	border: #232f3e;
}

#profil:hover {
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
