nb.define('input', {
    events: {
        'init': 'oninit',
        'click': 'focus'
    },

    /**
     * Init input
     * @fires 'nb-input_inited'
     */
    oninit: function() {
        var that = this;

        this.data = this.data();
        this.$node = $(this.node);

        if (this.data.type == 'simple') {
            this.$control = this.$node;
        } else {
            this.$control = this.$node.find('.nb-input__controller');
        }

        this.disabled = this.$control.prop('disabled');
        this.value = this.$control.val();
        this.focused = false;
        nb.on('nb-input_focusout', function() {
            that.blur();
        });
        this.trigger('nb-input_inited');
    },

    /**
     * Focus the input
     * @fires 'nb-input_focused'
     * @returns {Object} nb.block
     */
    focus: function() {
        if (!this.isEnabled()) {
            return this;
        }

        if (!this.$node.hasClass('nb-input_focus')) {
            nb.trigger('nb-input_focusout');
            this.$node.addClass('nb-input_focus');
            this.focused = true;
            this.$control.get(0).focus();
            this.trigger('nb-input_focused');
            return this;
        }

    },

    /**
     * Blur the input
     * @fires 'nb-input_blured'
     * @returns {Object} nb.block
     */
    blur: function() {
        this.$node.removeClass('nb-input_focus');
        this.focused = false;
        this.trigger('nb-input_blured');
        return this;
    },

    /**
     * Disables the input
     * @fires 'nb-input_disabled'
     * @returns {Object} nb.block
     */
    disable: function() {
        this.$node.addClass('is-disabled');
        this.$control.prop('disabled', true);
        this.trigger('nb-input_disabled');
        return this;
    },

    /**
     * Enables the input
     * @fires 'nb-input_enabled'
     * @returns {Object} nb.block
     */
    enable: function() {
        this.$node.removeClass('is-disabled');
        this.$control.prop('disabled', false);
        this.trigger('nb-input_enabled');
        return this;
    },

    /**
     * Set value of the input
     * @param {String|Object} value
     * @fires 'nb-input_value-set'
     * @returns {Object} nb.block
     */
    setValue: function(value) {
        this.value = value;
        this.$control.val(value);
        this.trigger('nb-input_value-set');
        return this;
    },

    /**
     * Get value of the input
     * @returns {String|Object} value
     */
    getValue: function() {
        // get actual value from <input/> and save it to instance
        this.value = this.$control.val();
        return this.value;
    },

    /**
     * Get name of the input
     * @returns {String|Object} name
     */
    getName: function() {
        return this.$control.prop('name');
    },

    /**
     * Set name of the input
     * @param {String|Object} value
     * @fires 'nb-input_name-set'
     * @returns {Object} nb.block
     */
    setName: function(value) {
        this.$control.attr('name', value);
        this.trigger('nb-input_name-set');
        return this;
    },
    
    /**
     * Return state of the input
     * @returns {Boolean}
     */
    isEnabled: function() {
        return !this.$control.prop('disabled');
    },

    /**
     * Destroy the button
     */
    destroy: function() {
        nb.destroy(this.node.getAttribute('id'));
    }
});
