using MediatR;
using PermissionLevelEnum = ChapterX.Domain.Entities.PermissionLevel;

namespace ChapterX.Application.PermissionLevel.Commands
{
    public record DeleteRequest(PermissionLevelEnum Value) : IRequest<DeleteResponse>;
}
