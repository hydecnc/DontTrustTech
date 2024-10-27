<script lang="ts">
    export let user: string = "Steve";
    export let sender: string = "DTT";
    export let title: string;
    export let message: string;
</script>

<div class="card rounded-lg margin">
    <h2 class="h3 mb-4">{title}</h2>

    <div>{`Dear, ${user}`}</div>
    <div class="whitespace-pre-wrap text-left">{@html message}</div>
    <div>Best regards,</div>
    <div>{sender}</div>
</div>

<style lang="postcss">
    .margin {
        border-radius: 15px;
        margin: 10px;
        margin-bottom: 20px;
        padding: 20px;
    }
</style>