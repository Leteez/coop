<template>
	<body>
		<Header/>
		<h2>Membres</h2>
		<div class="members" >
			<template v-for="members in $store.state.members">
				<div id="member">
					<Members :member="members"/>
				</div>
			</template>
		</div>
	</body>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Members from '@/components/Members.vue'
	export default{
		components:{
			Header,
			Members
		}
	}
</script>

<style>
#member {
	border: 0.1em solid #232f3e;
	border-radius: 10px;
	margin-left: 1em;
	margin-right: 1em;
	padding-top: 1em;
	margin-bottom: 1em;
}
</style>
