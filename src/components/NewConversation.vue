<template>
	<div>
		<div id="overlay" v-if="show">
			<div id="new-conversation">
				<div class="popup">
					<section>
						<a class="close" href="#noWhere" @click="closeForm()"><img class="btn_close" src="https://img.icons8.com/plasticine/2x/close-window.png"></a>
						<form @submit.prevent="newConversation">
							<fieldset>
								<label class="subject" id="label">Sujet</label>
								<input v-model="topic" required type="text" placeholder="De quoi voulez-vous discuter ?" id="input">
								<label class="tags" id="label">Étiquettes</label>
								<input v-model="label" required type="text" placeholder="Quels sont les concepts abordés ?" id="input">
								<button id="create">Créer</button>
							</fieldset>
						</form>
					</section>
				</div>
			</div>
		</div>
		<button class="show" @click="showForm()"><a class="overlay" href="#overlay">Créer une conversation</a></button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				show: false,
				topic: "",
				label: ""
			}
		},
		mounted(){
			this.$bus.$on('show-new-conversation', this.showForm);
		},
		methods:{
			newConversation(){
				api.post('channels',{label : this.label, topic : this.topic}).then(response=>{
					this.closeForm();
					this.$bus.$emit('charge-conversations');
				})
			},
			showForm(){
				this.show = true;
			},
			closeForm(){
				this.show = false;
			}
		}
	}
</script>

<style>
#overlay:target { display: block; }
button.show:hover { background-color: #e38a17; }
button.show a { color :  #FFFFFF; }
button.show:hover a {color: #232f3e; }
#label { color: black; }
#input { border: 0.1em solid #232f3e; }

#create {
	background-color: #232f3e;
	border: #232f3e;
	margin-top: 5em;
}

#create:hover {
	background-color: #e38a17;
	color: #232f3e;
}

#overlay{
	display: none;
	position: fixed;
	top: 0; right: 0; bottom: 0; left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
}

.popup{
	background: #fff;
	padding: 20px;
	border: 20px solid #ddd;
	position: relative;
	margin: 10% auto;
	width: 40%;
	box-shadow: 0px 0px 20px #000;
	border-radius: 10px;
}

img.btn_close {
	float: right;
	margin: -55px -55px 0 0;
	width: 60px;
}

button.show {
	margin-left: 5em;
	margin-bottom: 5em;;
	border: 0em;
	background-color: #232f3e;
}
</style>
