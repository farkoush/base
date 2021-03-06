<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Storage::deleteDirectory('public/media');
        Storage::makeDirectory('tmp', 0777);
        $this->call(CitiesTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(PassportTableSeeder::class);
        $this->call(TagTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(AssignRoleSeeder::class);
        $this->call(AddressTableSeeder::class);
        $this->call(MediaGroupSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(BusinessesTableSeeder::class);
        $this->call(TicketTableSeeder::class);
        // $this->call(CartsTableSeeder::class);
        $this->call(OrdersTableSeeder::class);
        $this->call(SearchPanelTableSeeder::class);
        $this->call(DesignerTableSeeder::class);
        Storage::deleteDirectory('tmp');
    }
}
