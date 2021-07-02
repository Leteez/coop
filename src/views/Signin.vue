<template>
	<body>
		<div class="scop">
			<h2>Inscription</h2>
			<form id="formulaire" @submit.prevent="signin">
				<div>
					<label>Nom Prénom</label>
					<input id="input" v-model="fullname" required type="text" placeholder="Nom Prénom">
				</div>
				<div>
					<label>Adresse email</label>
					<input id="input" v-model="email" type="text" required placeholder="Email">
				</div>
				<div>
					<label>Mot de passe</label>
					<input id="input" v-model="password" type="password" required placeholder="Mot de passe">
				</div>
				<div>
					<button id="inscription">Inscription</button>
				</div>
			</form>
			<div>
				<span>Connexion ?</span><router-link to='/login'><span id="click"> Cliquez-ici</span></router-link>
			</div>
		</div>
	</body>
</template>

<script>
	export default{
		data(){
			return{
				fullname : '',
				email : '',
				password : ''
			}
		},
		methods :{
			signin(){
				api.post('members',{
					fullname:this.fullname,
					email:this.email,
					password:this.password
				}).then(response=>{
					alert('Succès')
					this.$router.push('/login');
				}).catch(error=>{
					alert(error.response.data.message)
				})
			}
		}
	}
</script>

<style>
div.scop {
	margin-top: 50vh;
	transform: translateY(-50%);
	width: 15em;
	margin-right: auto;
	margin-left: auto;
	color :  black;
	text-align: center;
}

#input {
	border: 0.1em solid #232f3e;
}

span {
	color : #232f3e;
	font-size: 0.7em;
}

#click {
	color: #232f3e;
}

#click:hover {
	color: #e38a17;
}

#inscription {
	background-color: #232f3e;
	border: #232f3e;
}

#inscription:hover {
	background-color: #e38a17;
	color: #232f3e;
}
</style>
