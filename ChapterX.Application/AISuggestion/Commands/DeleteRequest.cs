using MediatR;

namespace ChapterX.Application.AISuggestion.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
