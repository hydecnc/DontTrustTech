<script>
    // let {} = $props();
    let {user = "default", email = '123@veggies.com', body=""} = $props();

</script>

<div>
	<h2>Congratulations! You have been selected for our $200 giveaway!</h2>
    <div>{email}</div>
	<div>
        Hey, {user}
    </div>

    <div class="btn">
        {body}
    </div>

        Congratulations again,
        DTT
</div>

<style>
</style>
