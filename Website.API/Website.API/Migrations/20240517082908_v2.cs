using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Website.API.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Tours_TourId1",
                table: "Image");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TourDate",
                newName: "TourDateId");

            migrationBuilder.AddColumn<int>(
                name: "TourDateId",
                table: "Tours",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "TourId1",
                table: "Image",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_TourDateId",
                table: "Tours",
                column: "TourDateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Tours_TourId1",
                table: "Image",
                column: "TourId1",
                principalTable: "Tours",
                principalColumn: "TourId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tours_TourDate_TourDateId",
                table: "Tours",
                column: "TourDateId",
                principalTable: "TourDate",
                principalColumn: "TourDateId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Tours_TourId1",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Tours_TourDate_TourDateId",
                table: "Tours");

            migrationBuilder.DropIndex(
                name: "IX_Tours_TourDateId",
                table: "Tours");

            migrationBuilder.DropColumn(
                name: "TourDateId",
                table: "Tours");

            migrationBuilder.RenameColumn(
                name: "TourDateId",
                table: "TourDate",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "TourId1",
                table: "Image",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Tours_TourId1",
                table: "Image",
                column: "TourId1",
                principalTable: "Tours",
                principalColumn: "TourId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
