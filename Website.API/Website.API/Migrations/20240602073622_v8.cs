using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Website.API.Migrations
{
    public partial class v8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tours_PolicyId",
                table: "Tours");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_PolicyId",
                table: "Tours",
                column: "PolicyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tours_PolicyId",
                table: "Tours");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_PolicyId",
                table: "Tours",
                column: "PolicyId",
                unique: true,
                filter: "[PolicyId] IS NOT NULL");
        }
    }
}
