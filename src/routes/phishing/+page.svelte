<script lang="ts">
    import Email from "$lib/Email.svelte";
    import {
        initializeStores,
        Modal,
        getModalStore,
    } from "@skeletonlabs/skeleton";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import kiss from "$lib/assets/gif/kiss.gif";

    initializeStores();
    const modalStore = getModalStore();

    let index = 0;
    let next = false;

    const phishingEmail = {
        title: "Congratulations! You've Been Selected to Receive $200!",
        content: `
We are excited to inform you that you've been chosen for a special reward of $200 as part of our loyal customer appreciation program! To claim your $200, please follow the steps below. But hurry, as this limited offer expires in 24 hours!

<strong>How to Claim Your Reward</strong>:

    1. Click on the secure link below to access our reward center:  
    Claim My $200 Now: https://fake-rewards.com/claim

    2. Log in using your account details to verify your identity.

    3. Complete a short verification process to confirm your eligibility.

Once you've verified your account, your $200 will be credited directly to your account within minutes!

Please note: Failure to claim your reward within 24 hours will result in forfeiture. Don't miss this opportunity!

If you have any questions, please feel free to reply to this email, and our customer service team will be happy to assist you.

`,
        answer: true,
        explanation:
            "This email is a phishing attempt because it promotes a sense of urgency and offers a reward that seems too good to be true, encouraging you to click on a suspicious link and provide personal information. Legitimate companies typically do not ask for sensitive details or direct you to log in via email links.",
        image: "https://i.imgur.com/TykCy5e.gif",
    };

    const realEmail = {
        title: "Follow-Up on Our Recent Discussion",
        content: `
I hope this message finds you well. I wanted to follow up on our recent conversation regarding [specific topic or project]. I appreciate your insights and would love to explore this further.

If you're available, I'd like to schedule a time to discuss our ideas in more detail. Please let me know your availability over the next few days, and I'll do my best to accommodate.

Thank you, and I look forward to hearing from you soon!
`,
        answer: false,
        explanation:
            "This email appears legitimate because it maintains a professional tone, references a previous conversation, and expresses a genuine interest in further discussion. Additionally, it invites the recipient to suggest their availability rather than demanding immediate action, which is characteristic of authentic communication in a business context.",
        image: kiss,
    };

    const emails = [phishingEmail, realEmail];
    let email: {
        title: string;
        content: string;
        answer: boolean;
        explanation: string;
        image: string;
    };

    const checkReponse = async () => {
        const modal: ModalSettings = {
            type: "alert",
            title: email.title,
            body: email.explanation,
            image: email.image,
        };
        if (email.answer) {
            modalStore.trigger(modal);
        } else {
            modalStore.trigger(modal);
        }
        index++;
        if (index >= emails.length) {
            next = true;
            return;
        }
        updateEmail(index);
    };
    const updateEmail = (index: number) => {
        email = emails[index];
    };
    updateEmail(0);
</script>

<h1 class="h1 text-center my-4">Email</h1>

<Email title={email.title} message={email.content} />

<Modal />
<div class="flex flex-row justify-center">
    <button
        class="btn variant-outline-primary mr"
        on:click={() => {
            checkReponse();
        }}>Check Email</button
    >
    {#if next}
        <a href="keylogger/resetpassword">
            <button class="btn variant-outline-secondary mr">Next</button>
        </a>
    {/if}
</div>

<style lang="postcss">
    .mr {
        margin-right: 10px;
    }
</style>
