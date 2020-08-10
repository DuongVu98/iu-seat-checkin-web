<template>
    <div>
        <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Seat occupied</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Delegate code">
                        <b-input
                            type="text"
                            :value="delegateCode"
                            placeholder="code..."
                            required
                            @keyup.native="setDelegateCode"
                        >
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button
                        class="button"
                        type="button"
                        @click="$parent.close()"
                    >
                        Close
                    </button>
                    <button
                        class="button is-primary"
                        type="button"
                        @click="$emit('input-code', delegateCode); $parent.close()"
                    >
                        OK
                    </button>
                    <button class="button is-danger" type="button">
                        Empty
                    </button>
                </footer>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "SeatCodeInput",
    props: {
        delegateCode: String,
    },
    methods: {
        setDelegateCode(event) {
            console.log(`Keyup --> ${event.target.value}`);
            this.delegateCode = event.target.value;
        },
    },
};
</script>
