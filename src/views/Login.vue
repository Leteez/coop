<template>
	<body>
		<div class="scop">
			<h2>Connection</h2>
			<form @submit.prevent="login">
				<div>
					<label>Adresse email</label>
					<input id="input" v-model="email" required type="email" placeholder="Email">
				</div>
				<div>
					<label>Mot de passe</label>
					<input id="input" v-model="password" required type="password" placeholder="Mot de passe">
				</div>
				<div>
					<button id="connection">Connection</button>
				</div>
			</form>
			<div>
				<span>Inscription ?</span><router-link to='/signin'><span id="click"> Cliquez-ici</span></router-link>
			</div>
		</div>
	</body>
</template>

<script>
	export default{
		data(){
			return{
				email : 'ludovic.c30@gmail.com',
				password : 'P@ssw0rd.'
			}
		},
		methods:{
			login(){
				api.post('members/signin',{
					email:this.email,
					password:this.password
				}).then(response=>{
					this.$store.commit('setMember',response.data.member);
					this.$store.commit('setToken',response.data.token);
					this.$router.push('/');
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
	width : 15em;
	margin-right: auto;
	margin-left: auto;
	color:  black;
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

#connection {
	background-color: #232f3e;
	border: #232f3e;
}

#connection:hover {
	background-color: #e38a17;
	color: #232f3e;
}
</style>
