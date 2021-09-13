<template>
	<div>
		<h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> 
            <span class="lnr lnr-home"></span> / </span> Active Projects
        </h4>
        <hr class="border-light container-m--x my-4">
		<projects-list 
			:statuses="statuses"
			:fields="fields"
			:tableFields="tableFields"
			:pagination="pagination"
			:limit="limit"
			:search="search"
		>
		</projects-list>
	</div>
</template>

<script>
	import ProjectsList from './ProjectsList.vue';

	export default {
		components:{
			'projects-list': ProjectsList
		},
		data(){
			return {
				tableFields: {
					projectId: {
						label: 'ID',
						sortable: true
					}, 
					name: {
						label: 'Name',
						sortable: true
					}, 
					'pm.name': {
						label: 'Responsible'
					}, 
					phase: {
						label: 'Phase',
						sortable: true
					}, 
					type: {
						label: 'Type',
						sortable: true
					},
					priority: {
						label: 'Priority',
						sortable: true
					},
					complexity: {
						label: 'IT impact',
						sortable: true
					},
					client: {
						label: 'Client',
						sortable: true
					}, 
					resmanType: {
					label: 'Bucket',
					sortable: true
					},
					show_details: {
						label: 'Details'
					},
					info: {
						label: ''
					}
				},
                statuses: ['Pending'],
                fields: '_id projectId name description pm.name status phase type priority complexity client resmanType',
				pagination: true,
				limit: false,
				search: true
			}
		}
	}
</script>