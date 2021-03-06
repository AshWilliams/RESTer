import { PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';
import dialogs from '../data/scripts/dialogs.js';

/**
 * @polymer
 * @customElement
 */
class RESTerAuthorizationProviderBasic extends PolymerElement {
    static get is() {
        return 'rester-authorization-provider-basic';
    }

    static get properties() {
        return {
            providerId: {
                type: Number,
                readOnly: true,
                value: 2
            },
            title: {
                type: String,
                readOnly: true,
                value: 'Basic'
            },
            needsConfiguration: {
                type: Boolean,
                readOnly: true,
                value: false
            },
            supportsIncognito: {
                type: Boolean,
                readOnly: true,
                value: false
            }
        };
    }

    generateToken() {
        const data = {
            userName: '',
            password: ''
        };

        return dialogs.authProviderBasicGenerateToken
            .show(data)
            .then(result => {
                if (result.reason.confirmed) {
                    const token = {};
                    token.providerId = this.providerId;
                    token.title = data.userName;
                    token.scheme = 'Basic';
                    token.token = window.btoa(
                        `${data.userName}:${data.password}`
                    );
                    return token;
                } else {
                    return Promise.reject();
                }
            });
    }
}

customElements.define(
    RESTerAuthorizationProviderBasic.is,
    RESTerAuthorizationProviderBasic
);
