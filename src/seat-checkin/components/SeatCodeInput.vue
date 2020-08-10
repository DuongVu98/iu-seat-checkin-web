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
                        @click="$parent.close()"
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
};
</script>
