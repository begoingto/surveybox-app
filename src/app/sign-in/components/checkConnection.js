import React, { Component } from 'react';
import { HiInformationCircle } from 'react-icons/hi2';
import { Alert } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CheckConnection extends Component {
    state = {
        isOnline: true,
        showAlert: false,
    };

    componentDidMount() {
        window.addEventListener('online', this.handleOnlineStatus);
        window.addEventListener('offline', this.handleOnlineStatus);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleOnlineStatus);
        window.removeEventListener('offline', this.handleOnlineStatus);
    }

    handleOnlineStatus = () => {
        const isOnline = navigator.onLine;
        this.setState({ isOnline });

        if (isOnline) {
            this.setState({ showAlert: true });
            toast.success('You are now online!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                this.setState({ showAlert: false });
            }, 3000);
        } else {
            this.setState({ showAlert: true });
        }
    };

    render() {
        const { isOnline, showAlert } = this.state;

        if (showAlert) {
            if (isOnline) {
                return (
                    <div>
                        <Alert color="success" icon={HiInformationCircle}>
              <span>
                <p>You are now online!</p>
              </span>
                        </Alert>
                        <ToastContainer /> {/* Toast container to show toast messages */}
                    </div>
                );
            } else {
                return (
                    <div>
                        <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <p>You are currently offline. Please check your internet connection.</p>
              </span>
                        </Alert>
                    </div>
                );
            }
        } else {
            // Return null if showAlert is false (no alert to display)
            return null;
        }
    }
}

export default CheckConnection;
