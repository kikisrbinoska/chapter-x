using MediatR;

namespace ChapterX.Application.ReadingList.Commands
{
    public record UpdateRequest(int Id, string Name, string? Content, bool IsPublic) : IRequest<UpdateResponse>;
}
