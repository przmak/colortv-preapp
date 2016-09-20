Vagrant.configure(2) do |config|
	config.vm.define "nodejs" do |nodejs|
		nodejs.vm.provider "virtualbox" do |vbox_node|
			vbox_node.name = "NodeJS Box"			
		end
		nodejs.vm.network "forwarded_port", guest: 9998, host_ip: "127.0.0.1", host: 9998, protocol: "tcp"	

		
		nodejs.vm.box = "centos/7"	
		nodejs.vm.synced_folder ".", "/home/vagrant/sync", disabled: true
		nodejs.vm.provision "shell", inline: "sudo curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -"
		nodejs.vm.provision "shell", inline: "sudo yum -y install nodejs"
		nodejs.vm.provision "shell", inline: "sudo yum install vim-X11 vim-common vim-enhanced vim-minimal"
	end
end