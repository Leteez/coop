<template>
	<body>
		<Header/>
		<h2>Conversations</h2>
		<NewConversation/>
		<div class="conversations">
			<template v-for="conversation in $store.state.conversations">
				<Conversation :conversation="conversation"/>
			</template>
		</div>
	</body>
</template>

<script>
	import Header from '@/components/Header.vue'
	import NewConversation from '@/components/NewConversation.vue'
	import Conversation from '@/components/Conversation.vue'
	export default{
		components:{
			Header,
			NewConversation,
			Conversation
		}
	}
</script>

<style>
h2 {
	text-align: center;
	color: #e38a17;
}
</style>
