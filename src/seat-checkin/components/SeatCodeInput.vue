<template>
    <div>
        <form action="">
            <div class="modal-card" style="width: auto">
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
                    <button class="button" type="button" @click="closeModal()">
                        Close
                    </button>
                    <button class="button is-primary" type="button" @click="enterCode()">
                        OK
                    </button>
                    <button v-if="occupiedState" class="button is-danger" type="button" @click="deleteData()">
                        Delete
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
    data() {
        return {
            inputCode: null,
            occupiedState: false,
        };
    },
    created() {
        this.occupiedState = this.$props.delegateCode == "" ? false : true;
    },
    methods: {
        setDelegateCode(event) {
            this.inputCode = event.target.value;
        },
        enterCode() {
            if (this.occupiedState == true) {
                this.$emit("update-code", this.inputCode);
            } else {
                this.$emit("input-code", this.inputCode);
            }
            this.$emit("close-modal");
        },
        closeModal() {
            this.$emit("close-modal");
        },
        deleteData() {
            this.$emit("close-modal");
            this.$emit("delete");
        },
    },
};
</script>
