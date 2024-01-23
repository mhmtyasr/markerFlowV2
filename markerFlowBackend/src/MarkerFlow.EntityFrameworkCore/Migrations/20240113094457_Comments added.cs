using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarkerFlow.Migrations
{
    /// <inheritdoc />
    public partial class Commentsadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Topics");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Topics",
                type: "text",
                nullable: true);
        }
    }
}
